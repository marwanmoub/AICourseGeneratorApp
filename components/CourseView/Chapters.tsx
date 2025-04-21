import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { CourseItem } from "@/app/addCourse";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

const Chapters = ({ course }: { course: DocumentData | CourseItem }) => {
  const router = useRouter();

  const isChapterCompleted = (index: number): boolean => {
    const isCompleted: boolean = course?.completedChapters?.find(
      (item: number) => Number(item) === index
    );
    return isCompleted;
  };

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
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/chapterView",
                params: {
                  chapterParams: JSON.stringify(item),
                  docId: course?.docId,
                  chapterIndex: index + 1,
                },
              })
            }
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

            {isChapterCompleted(index + 1) ? (
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color={Colors.GREEN}
              />
            ) : (
              <Ionicons name="play" size={24} color={Colors.PRIMARY} />
            )}
          </TouchableOpacity>
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
