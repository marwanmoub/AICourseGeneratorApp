import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Progress from "react-native-progress";
import Colors from "@/constants/Colors";
import Button from "@/components/Shared/Button";
import { completeChapter } from "@/lib/actions/course.actions";

const ChapterView = () => {
  const {
    chapterParams,
    docId,
    chapterIndex,
  }: { chapterParams: any; docId: string; chapterIndex: number } =
    useLocalSearchParams();
  const chapter = JSON.parse(chapterParams);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getProgress = (currentPage: number): number => {
    return currentPage / chapter?.topics?.length;
  };

  const onChapterComplete = async () => {
    setLoading(true);
    await completeChapter(docId, chapterIndex).then((response) => {
      if (response?.success) {
        router.replace(`/courseView/${docId}`);
      }
      setLoading(false);
    });
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <Progress.Bar
        progress={getProgress(currentPage)}
        width={Dimensions.get("screen").width * 0.85}
      />
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          {chapter?.topics[currentPage]?.topicName}
        </Text>

        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
            marginTop: 7,
          }}
        >
          {chapter?.topics[currentPage]?.description}
        </Text>

        {chapter?.topics[currentPage]?.code && (
          <View>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 20,
              }}
            >
              Code:
            </Text>
            <Text
              style={[
                styles.codeDefinitionText,
                {
                  backgroundColor: Colors.BLACK,
                  color: Colors.WHITE,
                  fontSize: 15,
                },
              ]}
            >
              {chapter?.topics[currentPage]?.code}
            </Text>
          </View>
        )}

        {chapter?.topics[currentPage]?.definition && (
          <View>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 20,
              }}
            >
              Definition:
            </Text>
            <Text style={styles.codeDefinitionText}>
              {chapter?.topics[currentPage]?.definition}
            </Text>
          </View>
        )}
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 15,
          width: "100%",
          left: 25,
        }}
      >
        {chapter?.topics?.length - 1 !== currentPage ? (
          <Button
            text="Next"
            onPress={() => {
              setCurrentPage(currentPage + 1);
            }}
          />
        ) : (
          <Button
            text="Finish"
            onPress={() => {
              onChapterComplete();
            }}
            loading={loading}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeDefinitionText: {
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: "outfit",
    fontSize: 18,
    marginTop: 15,
  },
});

export default ChapterView;
