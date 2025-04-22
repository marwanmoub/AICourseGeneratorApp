import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import * as Progress from "react-native-progress";
import Button from "@/components/Shared/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

export interface Result {
  userChoice: any;
  isCorrect: boolean;
  question: string;
  correctAns: string;
}

interface SelectedOption {
  index: number;
  name: string;
}

const Quiz = () => {
  const { courseParams }: { courseParams: any } = useLocalSearchParams();
  const course = JSON.parse(courseParams);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(
    null
  );
  const [result, setResult] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const quiz = course?.quizes;

  const getProgress = () => {
    const percentage = currentPage / quiz?.length;
    return percentage;
  };

  const onOptionSelect = (selectedChoice: string) => {
    setResult((prev) => [
      ...prev,
      {
        userChoice: selectedChoice,
        isCorrect: quiz[currentPage]?.correctAns === selectedChoice,
        question: quiz[currentPage]?.question,
        correctAns: quiz[currentPage]?.correctAns,
      },
    ]);
  };

  const onQuizSubmission = async (finalResult?: Result[]) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "Courses", course?.docId), {
        quizResult: finalResult ? finalResult : result,
      });
      setLoading(false);

      router.replace({
        pathname: "/quiz/summary",
        params: {
          quizResult: finalResult
            ? JSON.stringify(finalResult)
            : JSON.stringify(result),
        },
      });
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  if (!quiz) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

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
          padding: 25,
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
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
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
              color: Colors.WHITE,
            }}
          >
            {currentPage + 1} of {quiz?.length}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Progress.Bar
            progress={getProgress()}
            width={Dimensions.get("screen").width * 0.85}
            color={Colors.WHITE}
            height={10}
          />
        </View>

        <View
          style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            marginTop: 30,
            height: Dimensions.get("screen").height * 0.65,
            elevation: 1,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: "outfit-bold",
              textAlign: "center",
            }}
          >
            {quiz[currentPage]?.question}
          </Text>

          {quiz[currentPage]?.options?.map((item: string, index: number) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedOption({
                  index,
                  name: item,
                });
              }}
              key={index}
              style={{
                padding: 20,
                borderWidth: 1,
                borderRadius: 15,
                marginTop: 8,
                backgroundColor:
                  selectedOption?.index === index
                    ? Colors.LIGHT_GREEN
                    : undefined,
                borderColor:
                  selectedOption?.index === index ? Colors.GREEN : undefined,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 20,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedOption?.toString() && quiz?.length - 1 > currentPage && (
          <Button
            text="Next"
            onPress={() => {
              onOptionSelect(selectedOption?.name);
              setCurrentPage(currentPage + 1);
              setSelectedOption(null);
            }}
          />
        )}

        {selectedOption?.toString() && quiz?.length - 1 === currentPage && (
          <Button
            text="Submit"
            loading={loading}
            onPress={() => {
              const finalResult = {
                userChoice: selectedOption?.name,
                isCorrect:
                  quiz[currentPage]?.correctAns === selectedOption?.name,
                question: quiz[currentPage]?.question,
                correctAns: quiz[currentPage]?.correctAns,
              };

              const finalResultArray = [...result, finalResult];
              onQuizSubmission(finalResultArray);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Quiz;
