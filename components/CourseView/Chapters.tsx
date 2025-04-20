import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { CourseItem } from "@/app/addCourse";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";

const Chapters = ({ course }: { course: DocumentData | CourseItem }) => {
  return (
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
        Chapters
      </Text>
      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <View
            style={{
              padding: 20,
              borderWidth: 0.5,
              borderRadius: 15,
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text style={styles.chapterText}>{index + 1}.</Text>
              <Text style={[styles.chapterText, { flexShrink: 1 }]}>
                {item?.chapter_title}
              </Text>
            </View>

            <Ionicons name="play" size={24} color={Colors.PRIMARY} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chapterText: {
    fontFamily: "outfit",
    fontSize: 20,
  },
});

export default Chapters;
