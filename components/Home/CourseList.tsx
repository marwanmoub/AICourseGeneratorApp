import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { CourseItem } from "@/app/addCourse";
import { DocumentData } from "firebase/firestore";
import Colors from "@/constants/Colors";
import { imageAssets } from "@/constants/Option";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import CourseListShared from "../Shared/CourseListShared";

const CourseList = ({
  courseList,
  heading = "Course List",
}: {
  courseList: CourseItem[] | DocumentData[];
  heading?: string;
}) => {
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        {heading}
      </Text>

      {courseList ? (
        <CourseListShared courseList={courseList} />
      ) : (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      )}
    </View>
  );
};

export default CourseList;
