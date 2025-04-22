import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { UserDetailedContext } from "@/context/UserDetailContext";
import { db } from "@/config/firebaseConfig";
import CourseProgressCard from "@/components/Shared/CourseProgressCard";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

const Progress = () => {
  const [courseList, setCourseList] = useState<DocumentData[]>([]);
  const { userDetail } = useContext(UserDetailedContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getCourseList = async () => {
    setCourseList([]);
    setLoading(true);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  useEffect(() => {
    userDetail && getCourseList();
  }, [userDetail]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }
  return (
    <View>
      <Image
        source={require("./../../assets/images/wave.png")}
        style={{
          position: "absolute",
          height: 500,
        }}
      />

      <View
        style={{
          width: "100%",
          position: "absolute",
          padding: 20,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            color: Colors.WHITE,
            marginBottom: 10,
          }}
        >
          Course Progress
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            getCourseList();
          }}
          refreshing={loading}
          data={courseList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/courseView/${item?.docId}`,
                  params: {
                    courseParams: JSON.stringify(item),
                  },
                })
              }
            >
              <CourseProgressCard item={item} width={"95%"} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Progress;
