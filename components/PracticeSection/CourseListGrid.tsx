import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { CourseItem } from "@/app/addCourse";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useRouter } from "expo-router";

const CourseListGrid = ({
  courseList,
  option,
}: {
  courseList: DocumentData[] | CourseItem[];
  option?: {
    name: string;
    image: any;
    icon: any;
    path: string;
  };
}) => {
  const router = useRouter();

  const onPress = (course: DocumentData | CourseItem) => {
    router.push({
      pathname: option?.path,
      params: {
        courseParams: JSON.stringify(course),
      },
    });
  };

  return (
    <View>
      <FlatList
        data={courseList}
        style={{
          padding: 20,
        }}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onPress(item);
            }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              backgroundColor: Colors.WHITE,
              margin: 7,
              borderRadius: 15,
              elevation: 1,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Colors.GRAY}
              style={{
                position: "absolute",
                left: 20,
                top: 10,
              }}
            />
            <Image
              source={option?.icon}
              style={{
                width: 100,
                height: 70,
                objectFit: "contain",
              }}
            />
            <Text
              numberOfLines={2}
              style={{
                fontFamily: "outfit",
                textAlign: "center",
                marginTop: 7,
              }}
            >
              {item?.course_title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseListGrid;
