import { View, Text, Platform } from "react-native";
import React from "react";
import Header from "@/components/Home/Header";
import Colors from "@/constants/Colors";
import NoCourse from "@/components/Home/NoCourse";

const Home = () => {
  return (
    <View
      style={{
        padding: 25,
        paddingTop: Platform.OS === "ios" ? 45 : undefined,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Header />
      <NoCourse />
    </View>
  );
};

export default Home;
