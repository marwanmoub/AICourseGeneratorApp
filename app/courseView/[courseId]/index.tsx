import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Intro from "@/components/CourseView/Intro";
import Colors from "@/constants/Colors";
import Chapters from "@/components/CourseView/Chapters";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const CourseView = () => {
  const {
    courseParams,
    courseId,
    enroll,
  }: { courseParams: any; courseId: string; enroll: string } =
    useLocalSearchParams();

  const enrollBoolean: boolean = enroll === "true" ? true : false;

  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCourseById = async () => {
    setLoading(true);
    const docRef = await getDoc(doc(db, "Courses", courseId));
    const courseData = docRef.data();
    setCourse(courseData);
    setLoading(false);
  };

  useEffect(() => {
    if (!courseParams) {
      getCourseById();
    } else {
      setCourse(JSON.parse(courseParams));
    }
  }, [courseId]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.WHITE,
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
    <FlatList
      data={[]}
      renderItem={() => null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
          }}
        >
          <Intro course={course} enroll={enrollBoolean} />
          <Chapters course={course} />
        </View>
      }
      ListHeaderComponentStyle={{ flex: 1 }}
    />
  );
};

export default CourseView;
