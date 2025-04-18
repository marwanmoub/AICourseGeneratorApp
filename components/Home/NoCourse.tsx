import { View, Text, Image } from "react-native";
import React from "react";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";

const NoCourse = () => {
  const router = useRouter();
  return (
    <View
      style={{
        marginTop: 40,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/book.png")}
        style={{
          height: 200,
          width: 200,
        }}
      />
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          textAlign: "center",
        }}
      >
        You have no courses
      </Text>

      <Button
        text="+   Create New Course"
        onPress={() => router.push("/addCourse")}
      />
      <Button text="Explore Existing Courses" type="outline" />
    </View>
  );
};

export default NoCourse;
