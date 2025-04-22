import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const QuestionAnswer = () => {
  const { courseParams }: { courseParams: any } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const qaList = course?.qa;

  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const router = useRouter();

  const selectQuestion = (index: number) => {
    if (index === selectedQuestion) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  return (
    <View>
      <Image
        source={require("./../../assets/images/wave.png")}
        style={{
          height: 500,
        }}
      />

      <View
        style={{
          position: "absolute",
          width: "100%",
          padding: 20,
          marginTop: 35,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 7,
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
        </View>
        <Text
          style={{
            fontSize: 28,
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
          }}
        >
          Question & Answers
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.WHITE,
            fontSize: 20,
          }}
        >
          {course?.course_title}
        </Text>

        <FlatList
          data={qaList}
          renderItem={({ item, index }) => (
            <Pressable
              style={styles.card}
              onPress={() => {
                selectQuestion(index);
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 20,
                }}
              >
                {item?.question}
              </Text>
              {selectedQuestion === index && (
                <View
                  style={{
                    borderTopWidth: 0.4,
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "outfit",
                      fontSize: 17,
                      color: Colors.GREEN,
                      marginTop: 10,
                    }}
                  >
                    Answer: {item?.answer}
                  </Text>
                </View>
              )}
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    marginTop: 15,
    borderRadius: 15,
    elevation: 1,
  },
});

export default QuestionAnswer;
