import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { imageAssets } from "@/constants/Option";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import { CourseItem } from "@/app/addCourse";

const Intro = ({ course }: { course: DocumentData | CourseItem }) => {
  const router = useRouter();

  return (
    <View>
      <Image
        source={imageAssets[course?.banner_image]}
        style={{
          width: "100%",
          height: 280,
        }}
      />
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          {course?.course_title}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Ionicons name="book-outline" size={20} color="black" />
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
            }}
          >
            {course?.chapters?.length} Chapters
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Description:{" "}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: Colors.GRAY,
            }}
          >
            {course?.description}
          </Text>
        </View>

        <Button text="Start Now" onPress={() => {}} />
      </View>
      <Pressable
        style={{
          position: "absolute",
          padding: 10,
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={34} color="black" />
      </Pressable>
    </View>
  );
};

export default Intro;
