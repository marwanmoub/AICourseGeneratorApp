import { auth, db } from "@/config/firebaseConfig";
import Toast from "react-native-toast-message";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SignUpSchema } from "../validation/auth.validation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ToastAndroid } from "react-native";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData extends SignInData {
  fullName: string;
}

export const CreateNewUser = async (data: SignUpData) => {
  try {
    let userResult: any;
    const validatedData = SignUpSchema.parse(data);
    if (validatedData) {
      await createUserWithEmailAndPassword(
        auth,
        validatedData.email,
        validatedData.password
      ).then(async (userCredential: any) => {
        const user = userCredential.user;
        userResult = await SaveUser(user, validatedData);
      });

      return {
        success: true,
        data: userResult?.data,
      };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const SaveUser = async (user: any, signUpData: SignUpData) => {
  const data = {
    name: signUpData.fullName,
    email: signUpData.email,
    member: false,
    uid: user?.uid,
  };
  await setDoc(doc(db, "users", signUpData.email), data);

  return {
    data,
  };
};

export const userSignIn = async (data: SignInData) => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      data?.email,
      data?.password
    );

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Signed In Successfully",
      visibilityTime: 2000,
    });
    const user = response.user;
    return {
      success: true,
      data: user,
    };
  } catch (err) {
    Toast.show({
      type: "error",
      text1: "Incorrect Email or Password",
      text2: "Sign In Failed",
      visibilityTime: 3000,
    });
    return {
      success: false,
      data: null,
    };
  }
};

export const getUserDetails = async (email: string) => {
  try {
    const result = await getDoc(doc(db, "users", email));
    if (result) {
      return {
        success: true,
        data: result?.data(),
      };
    }

    return {
      success: false,
      data: null,
    };
  } catch (err) {
    console.error(err);
  }
};
