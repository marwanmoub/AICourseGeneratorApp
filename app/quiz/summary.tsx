import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Result } from ".";
import Button from "@/components/Shared/Button";

const QuizSummary = () => {
  const { quizResult }: { quizResult: any } = useLocalSearchParams();
  const result = JSON.parse(quizResult);

  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(result?.length);

  const router = useRouter();

  const calculateResult = () => {
    console.log("HELLOO");
    if (result !== undefined) {
      const correctAns = result.filter(
        (item: Result) => item.isCorrect === true
      );

      setCorrectAnswers(correctAns?.length);
    }
  };

  const getPercentageMark = () => {
    return Number(((correctAnswers / totalQuestions) * 100).toFixed(0));
  };

  useEffect(() => {
    calculateResult();
  }, []);

  return (
    <FlatList
      data={[]}
      style={{
        backgroundColor: Colors.WHITE,
      }}
      renderItem={() => null}
      ListHeaderComponent={
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
              padding: 35,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-bold",
                fontSize: 30,
                color: Colors.WHITE,
              }}
            >
              Quiz Summary
            </Text>
            <View
              style={{
                backgroundColor: Colors.WHITE,
                padding: 20,
                borderRadius: 20,
                marginTop: 60,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                source={require("./../../assets/images/trophy.png")}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: -60,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-bold",
                }}
              >
                {getPercentageMark() > 60 ? "Congratulations" : "Try Again!"}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit",
                  color: Colors.GRAY,
                  fontSize: 17,
                }}
              >
                You Scored {getPercentageMark()}%
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>Q {totalQuestions}</Text>
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>✅ {correctAnswers}</Text>
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultText}>
                    ❌ {totalQuestions - correctAnswers}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              text="Back to Home"
              onPress={() => {
                router.replace("/(tabs)/home");
              }}
            />

            <View
              style={{
                marginTop: 25,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 25,
                }}
              >
                Summary
              </Text>
              <FlatList
                data={result}
                renderItem={({
                  item,
                  index,
                }: {
                  item: Result;
                  index: number;
                }) => (
                  <View
                    style={{
                      padding: 15,
                      borderWidth: 1,
                      marginTop: 5,
                      borderRadius: 15,
                      backgroundColor: item?.isCorrect
                        ? Colors.LIGHT_GREEN
                        : Colors.LIGHT_RED,
                      borderColor: item?.isCorrect ? Colors.GREEN : Colors.RED,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "outfit",
                        fontSize: 20,
                      }}
                    >
                      {item?.question}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit",
                        fontSize: 15,
                        marginTop: 5,
                      }}
                    >
                      Ans: {item?.correctAns}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  resultText: {
    fontFamily: "outfit",
    fontSize: 20,
  },
  resultTextContainer: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    elevation: 1,
  },
});

export default QuizSummary;
