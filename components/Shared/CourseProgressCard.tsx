import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { imageAssets } from "@/constants/Option";
import * as Progress from "react-native-progress";
import { CourseItem } from "@/app/addCourse";
import { DocumentData } from "firebase/firestore";

const CourseProgressCard = ({
  item,
  width = 280,
}: {
  item: CourseItem | DocumentData;
  width?: any;
}) => {
  const calculateCourseProgress = (course: CourseItem | DocumentData) => {
    const completedChapterCount = course?.completedChapters?.length;
    const percentage = completedChapterCount / course?.chapters?.length;

    return percentage;
  };
  return (
    <View
      style={{
        margin: 7,
        padding: 15,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        width: width,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <Image
          source={imageAssets[item?.banner_image]}
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontFamily: "outfit-bold",
              fontSize: 19,
              flexWrap: "wrap",
            }}
          >
            {item?.course_title}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 15,
            }}
          >
            {item?.chapters?.length} Chapters
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
        }}
      >
        <Progress.Bar
          progress={calculateCourseProgress(item)}
          width={width - 30}
        />
        <Text
          style={{
            fontFamily: "outfit",
            marginTop: 2,
          }}
        >
          {item?.completedChapters?.length} Out of {item?.chapters?.length}{" "}
          Chapters Completed
        </Text>
      </View>
    </View>
  );
};

export default CourseProgressCard;
