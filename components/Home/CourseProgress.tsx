import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { CourseItem } from "@/app/addCourse";
import { imageAssets } from "@/constants/Option";
import Colors from "@/constants/Colors";
import * as Progress from "react-native-progress";
import CourseProgressCard from "../Shared/CourseProgressCard";

const CourseProgress = ({
  courseList,
}: {
  courseList: CourseItem[] | DocumentData[];
}) => {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          color: Colors.WHITE,
        }}
      >
        Progress
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={courseList}
        renderItem={({ item, index }) => (
          <View key={index}>
            <CourseProgressCard item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default CourseProgress;
