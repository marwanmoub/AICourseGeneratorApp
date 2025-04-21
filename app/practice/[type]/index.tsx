import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { imageAssets, PracticeOption } from "./../../../constants/Option";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserDetailedContext } from "@/context/UserDetailContext";
import CourseListGrid from "@/components/PracticeSection/CourseListGrid";
import { DocumentData } from "firebase/firestore";
import { CourseItem } from "@/app/addCourse";

const PracticeHome = () => {
  const { type } = useLocalSearchParams();
  const option = PracticeOption.find((item) => item.name === type);
  const router = useRouter();

  const { userDetail } = useContext(UserDetailedContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [courseList, setCourseList] = useState<DocumentData[] | CourseItem[]>(
    []
  );

  const getCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    try {
      const q = query(
        collection(db, "Courses"),
        where("createdBy", "==", userDetail?.email),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCourseList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    userDetail && getCourseList();
  }, [userDetail]);

  return (
    <View>
      <Image
        source={option?.image}
        style={{
          height: 200,
          width: "100%",
        }}
      />
      <View
        style={{
          position: "absolute",
          padding: 10,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{
              backgroundColor: Colors.WHITE,
              padding: 8,
              borderRadius: 10,
            }}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
            color: Colors.WHITE,
          }}
        >
          {type}
        </Text>
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={{
            marginTop: 150,
          }}
        />
      )}

      <CourseListGrid courseList={courseList} option={option} />
    </View>
  );
};

export default PracticeHome;
