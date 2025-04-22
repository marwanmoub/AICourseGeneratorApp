import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FlipCard from "react-native-flip-card";
import * as Progress from "react-native-progress";

const FlashCards = () => {
  const { courseParams }: { courseParams: any } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const flashcards = course?.flashcards;

  const [currentPage, setCurrentPage] = useState(0);

  const router = useRouter();

  const width = Dimensions.get("screen").width;

  const onScroll = (event) => {
    const index = Math.round(event?.nativeEvent?.contentOffset.x / width);
    setCurrentPage(index);
  };

  const getProgress = () => {
    const percentage = currentPage / flashcards?.length;
    return percentage;
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
            {currentPage + 1} of {flashcards?.length}
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
        <FlatList
          data={flashcards}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 500,
                width: width * 0.9,
                marginTop: 60,
              }}
            >
              <FlipCard style={styles.flipCard}>
                <View style={styles.front}>
                  <Text
                    style={{
                      width: Dimensions.get("screen").width * 0.78,
                      padding: 20,
                      fontFamily: "outfit-bold",
                      fontSize: 28,
                      textAlign: "center",
                    }}
                  >
                    {item?.front}
                  </Text>
                </View>

                <View style={styles.back}>
                  <Text
                    style={{
                      width: Dimensions.get("screen").width * 0.78,
                      padding: 20,
                      fontFamily: "outfit",
                      fontSize: 28,
                      textAlign: "center",
                      color: Colors.WHITE,
                    }}
                  >
                    {item?.back}
                  </Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
  },
  front: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 20,
  },
  flipCard: {
    width: Dimensions.get("screen").width * 0.78,
    height: 400,
    backgroundColor: Colors.WHITE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: Dimensions.get("screen").width * 0.05,
  },
});

export default FlashCards;
