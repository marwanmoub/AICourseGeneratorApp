import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "@/constants/Colors";
import CustomTextInput from "@/components/FormComponents/CustomTextInput";
import Button from "@/components/Shared/Button";
import Prompt from "@/constants/Prompt";
import { GenerateTopics } from "@/config/AiModel";
import { UserDetailedContext } from "@/context/UserDetailContext";
import { createCourse } from "@/lib/actions/course.actions";
import { useRouter } from "expo-router";

export interface TopicItem {
  chapter_title: string;
  topics: string[];
  chapterNumber?: number;
}

const AddCourse = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [courseLoading, setCourseLoading] = useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<TopicItem[]>([]);

  const { userDetail } = useContext(UserDetailedContext);

  const router = useRouter();

  const onGenerateTopic = async () => {
    //get topic ideas from ai model
    const PROMPT = userPrompt + "\n" + Prompt.COURSE_TOPICS;

    setLoading(true);
    await GenerateTopics(PROMPT)
      .then((aiResponse) => {
        setTopics(aiResponse);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onTopicSelect = (topic: TopicItem) => {
    const alreadyExists = selectedTopics.find(
      (item: TopicItem) => item == topic
    );

    if (!alreadyExists) {
      setSelectedTopics((prev: TopicItem[]) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((item: TopicItem) => item !== topic);
      setSelectedTopics(topics);
    }
  };

  const isTopicSelected = (topic: TopicItem) => {
    const selected = selectedTopics.find((item) => item === topic);
    return selected;
  };

  const onGenerateCourse = async () => {
    console.log(selectedTopics);
    setCourseLoading(true);
    if (selectedTopics && selectedTopics.length > 0 && userDetail) {
      const response = await createCourse(selectedTopics, userDetail);
      if (response.success) {
        router.push("/(tabs)/home");
      }
    }
    setCourseLoading(false);
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
          }}
        >
          Create New Course
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 30,
          }}
        >
          What do you want to learn today?
        </Text>

        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
            marginTop: 8,
            color: Colors.GRAY,
          }}
        >
          Write what course you want to create (Ex: Learn TypeScript or
          Introduction to Programming)
        </Text>

        <CustomTextInput
          placeholder="(Ex: Introduction to Programming)"
          customStyles={styles.textInput}
          numberOfLines={3}
          multiline={true}
          onChangeValue={(value) => {
            setUserPrompt(value);
          }}
        />

        <Button
          text="Generate Topic"
          type="outline"
          onPress={onGenerateTopic}
          loading={loading}
        />

        {/* This View contains the FlatList and its title */}
        <View
          style={{
            marginTop: 15,
            // Removed marginBottom here, use contentContainerStyle on ScrollView or ItemSeparatorComponent on FlatList for spacing
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 20,
              marginBottom: 8, // Add some space below this text
            }}
          >
            Select all topics which you want to add in this course
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false} // FlatList inside ScrollView might not need its own indicator
            data={topics}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  marginBottom: 10,
                }}
                onPress={() => {
                  onTopicSelect(item);
                }}
              >
                <Text
                  style={{
                    padding: 7,
                    borderWidth: 0.4,
                    borderRadius: 99,
                    paddingHorizontal: 15,
                    backgroundColor: isTopicSelected(item)
                      ? Colors.PRIMARY
                      : undefined,
                    color: isTopicSelected(item)
                      ? Colors.WHITE
                      : Colors.PRIMARY,
                  }}
                >
                  {item?.chapter_title}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </ScrollView>

      {selectedTopics?.length > 0 && (
        <Button
          text="Generate Course"
          onPress={onGenerateCourse}
          loading={courseLoading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    alignItems: "flex-start",
    fontSize: 18,
  },
});

export default AddCourse;
