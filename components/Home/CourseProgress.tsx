import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { CourseItem } from "@/app/addCourse";
import { imageAssets } from "@/constants/Option";
import Colors from "@/constants/Colors";
import * as Progress from "react-native-progress";

const CourseProgress = ({
  courseList,
}: {
  courseList: DocumentData[] | CourseItem[];
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
        }}
      >
        Progress
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={courseList}
        renderItem={({ item, index }) => (
          <View
            style={{
              margin: 7,
              padding: 15,
              backgroundColor: Colors.BG_GRAY,
              borderRadius: 15,
              width: 280,
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
              <Progress.Bar progress={0} width={250} />
              <Text
                style={{
                  fontFamily: "outfit",
                  marginTop: 2,
                }}
              >
                3 Out of {item?.chapters?.length} Chapters Completed
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CourseProgress;
