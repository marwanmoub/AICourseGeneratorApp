import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
  topics: {
    code?: string;
    definition?: string;
    explain?: string;
    description: string;
  }[];
  chapterNumber?: number;
}

interface FlashCard {
  front: string;
  back: string;
}

interface QuestionAnswer {
  question: string;
  answer: string;
}

interface Quiz {
  options: string[];
  correctAns: string;
}

export interface CourseItem {
  course_title: string;
  banner_image: string;
  description: string;
  flashcards: FlashCard[];
  qa: QuestionAnswer[];
  quizes: Quiz[];
  chapters?: TopicItem[];
  docId?: string;
  completedChapters?: number[];
}

const AddCourse = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [courseLoading, setCourseLoading] = useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<TopicItem[]>([]);
  const [courseInformation, setCourseInformation] = useState<CourseItem>();

  const { userDetail } = useContext(UserDetailedContext);

  const router = useRouter();

  useEffect(() => {
    console.log(userDetail);
  }, []);

  const onGenerateTopic = async () => {
    if (userDetail?.member === false) {
      router.push("/subscriptionWall");
      return;
    }

    //get topic ideas from ai model
    const PROMPT = userPrompt + "\n" + Prompt.COURSE_TOPICS;

    setLoading(true);
    await GenerateTopics(PROMPT)
      .then((aiResponse) => {
        setTopics(aiResponse?.chapters);
        const course = {
          course_title: aiResponse?.course_title,
          banner_image: aiResponse?.banner_image,
          description: aiResponse?.description,
          flashcards: aiResponse?.flashcards,
          qa: aiResponse?.qa,
          quizes: aiResponse?.quizes,
        };
        setCourseInformation(course);
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
    setCourseLoading(true);
    if (
      selectedTopics &&
      selectedTopics.length > 0 &&
      userDetail &&
      courseInformation
    ) {
      const response = await createCourse(
        selectedTopics,
        courseInformation,
        userDetail
      );
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
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponentStyle={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
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

            <View
              style={{
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 20,
                  marginBottom: 8,
                }}
              >
                (This might take some time) Select all topics which you want to
                add in this course
              </Text>
              <FlatList
                showsVerticalScrollIndicator={false}
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
          </View>
        }
      />

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
