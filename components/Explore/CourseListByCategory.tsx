import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { CourseItem } from "@/app/addCourse";
import { useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import CourseList from "../Home/CourseList";

const CourseListByCategory = ({ category }: { category: string }) => {
  const [courseList, setCourseList] = useState<CourseItem[] | DocumentData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const getCourseListByCategory = async () => {
    setCourseList([]);
    setLoading(true);
    try {
      const q = query(
        collection(db, "Courses"),
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setCourseList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    getCourseListByCategory();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View>
      <CourseList courseList={courseList} heading={category} />
    </View>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    margin: 6,
    borderRadius: 15,
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    width: 260,
  },
});

export default CourseListByCategory;
