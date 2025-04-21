import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { CourseItem } from "@/app/addCourse";
import { DocumentData } from "firebase/firestore";
import Colors from "@/constants/Colors";
import { imageAssets } from "@/constants/Option";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const CourseList = ({
  courseList,
}: {
  courseList: CourseItem[] | DocumentData[];
}) => {
  const router = useRouter();

  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        CourseList
      </Text>

      {courseList ? (
        <FlatList
          horizontal={true}
          data={courseList}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={styles.courseContainer}
              onPress={() =>
                router.push({
                  pathname: `/courseView/${item?.docId}`,
                  params: {
                    courseParams: JSON.stringify(item),
                  },
                })
              }
            >
              <Image
                source={imageAssets[item?.banner_image]}
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 15,
                }}
              />
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 18,
                  marginTop: 10,
                }}
              >
                {item?.course_title}
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
                  }}
                >
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    margin: 6,
    borderRadius: 15,
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    width: 260,
  },
});

export default CourseList;
