import { CourseItem, TopicItem } from "@/app/addCourse";
import { db } from "@/config/firebaseConfig";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
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

    const docId: string = Date.now().toString() + userDetail?.email;
    await setDoc(doc(db, "Courses", docId), {
      ...course,
      createdAt: new Date(),
      createdBy: userDetail?.email,
      docId,
    });

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

export const completeChapter = async (docId: string, chapterIndex: number) => {
  try {
    const udpateCourse = await updateDoc(doc(db, "Courses", docId), {
      completedChapters: arrayUnion(chapterIndex),
    });

    if (udpateCourse !== null) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Chapter Completed Successfully",
        visibilityTime: 2000,
      });

      return { success: true };
    }
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Could not update course completion",
      visibilityTime: 3000,
    });
    console.error(err);
    throw err;
  }
};
