import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { imageAssets } from "@/constants/Option";
import Intro from "@/components/CourseView/Intro";
import Colors from "@/constants/Colors";
import Chapters from "@/components/CourseView/Chapters";

const CourseView = () => {
  const { courseParams }: { courseParams: string } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
          }}
        >
          <Intro course={course} />
          <Chapters course={course} />
        </View>
      }
      ListHeaderComponentStyle={{ flex: 1 }}
    />
  );
};

export default CourseView;
