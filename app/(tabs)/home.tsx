import { View, Platform } from "react-native";
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

const Home = () => {
  const [courseList, setCourseList] = useState<DocumentData[]>([]);
  const { userDetail } = useContext(UserDetailedContext);

  const getCourseList = async () => {
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    userDetail && getCourseList();
  }, [userDetail]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: Platform.OS === "ios" ? 45 : undefined,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Header />
      {courseList?.length === 0 ? (
        <NoCourse />
      ) : (
        <View>
          <PracticeSection />
          <CourseList courseList={courseList} />
        </View>
      )}
    </View>
  );
};

export default Home;
