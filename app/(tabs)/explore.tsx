import { View, Text, FlatList } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { courseCategory } from "@/constants/Option";
import CourseListByCategory from "@/components/Explore/CourseListByCategory";

const Explore = () => {
  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 30,
            }}
          >
            Explore More Courses
          </Text>

          {courseCategory?.map((item, index) => (
            <View
              key={index}
              style={{
                marginTop: 10,
              }}
            >
              <CourseListByCategory category={item} />
            </View>
          ))}
        </View>
      }
    />
  );
};

export default Explore;
