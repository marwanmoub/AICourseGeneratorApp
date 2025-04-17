import { auth, db } from "@/config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SignUpSchema } from "../validation/auth.validation";
import { doc, setDoc } from "firebase/firestore";

interface SignUpData {
  email: string;
  fullName: string;
  password: string;
}

export const CreateNewUser = async (data: SignUpData) => {
  try {
    const validatedData = SignUpSchema.parse(data);
    if (validatedData) {
      await createUserWithEmailAndPassword(
        auth,
        validatedData.email,
        validatedData.password
      ).then(async (userCredential: any) => {
        const user = userCredential.user;
        await SaveUser(user, validatedData);
      });

      return {
        success: true,
        data: validatedData,
      };
    }
  } catch (err) {
    console.log("Could not create a new account");
    throw err;
  }
};

export const SaveUser = async (user: any, signUpData: SignUpData) => {
  await setDoc(doc(db, "users", signUpData.email), {
    name: signUpData.fullName,
    email: signUpData.email,
    member: false,
    uid: user?.uid,
  });
};
