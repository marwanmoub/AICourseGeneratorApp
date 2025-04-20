import { CourseItem, TopicItem } from "@/app/addCourse";
import { db } from "@/config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

export const createCourse = async (
  selectedTopics: TopicItem[],
  courseInformation: CourseItem,
  userDetail
) => {
  try {
    const course = {
      ...courseInformation,
      chapters: selectedTopics,
    };

    for (let i = 0; i < course.chapters.length - 1; i++)
      course.chapters[i].chapterNumber = i + 1;

    await setDoc(
      doc(db, "Courses", `${Date.now().toString() + userDetail?.email}`),
      {
        ...course,
        createdAt: new Date(),
        createdBy: userDetail?.email,
      }
    );

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Created Course Successfully",
      visibilityTime: 2000,
    });

    return {
      success: true,
      data: course,
    };
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Could not create course",
      visibilityTime: 3000,
    });
    console.error(err);
    throw err;
  }
};
