import { View, Platform, FlatList, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/Home/Header";
import Colors from "@/constants/Colors";
import NoCourse from "@/components/Home/NoCourse";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserDetailedContext } from "@/context/UserDetailContext";
import { DocumentData } from "firebase/firestore";
import CourseList from "@/components/Home/CourseList";
import PracticeSection from "@/components/Home/PracticeSection";
import CourseProgress from "@/components/Home/CourseProgress";

const Home = () => {
  const [courseList, setCourseList] = useState<DocumentData[]>([]);
  const { userDetail } = useContext(UserDetailedContext);
  const [loading, setLoading] = useState(false);

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <FlatList
        data={[]}
        onRefresh={() => {
          getCourseList();
        }}
        refreshing={loading}
        renderItem={() => null}
        ListHeaderComponent={
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.WHITE,
            }}
          >
            <Image
              source={require("./../../assets/images/wave.png")}
              style={{
                position: "absolute",
                height: 500,
              }}
            />
            <View
              style={{
                padding: 25,
                paddingTop: Platform.OS === "ios" ? 45 : undefined,
                // flex: 1,
                // backgroundColor: Colors.WHITE,
              }}
            >
              <Header />
              {courseList?.length === 0 ? (
                <NoCourse />
              ) : (
                <View>
                  <CourseProgress courseList={courseList} />
                  <PracticeSection />
                  <CourseList courseList={courseList} />
                </View>
              )}
            </View>
          </View>
        }
      />
    </View>
  );
};

export default Home;
