import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useState } from "react";
import CustomTextInput from "./CustomTextInput";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { SignUpSchema } from "@/lib/validation/auth.validation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { CreateNewUser } from "@/lib/actions/user.actions";

const AuthForm = ({ type = "sign-up" }) => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const createAccount = async () => {
    const data = {
      fullName,
      email,
      password,
    };
    const result = await CreateNewUser(data);
    if (result?.success) router.push("/auth/signIn");
  };

  const SaveUser = () => {};

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: 100,
        padding: 25,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("./../../assets/images/logo.png")}
        style={{
          width: 180,
          height: 180,
        }}
      />

      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit-bold",
        }}
      >
        {type === "sign-up" ? "Create New Account" : "Welcome Back"}
      </Text>

      {type === "sign-up" && (
        <CustomTextInput
          placeholder="Full Name"
          onChange={(value) => {
            setFullName(value);
          }}
        />
      )}
      <CustomTextInput
        placeholder="Email"
        onChange={(value) => {
          setEmail(value);
        }}
      />
      <CustomTextInput
        placeholder="Password"
        isPassword
        onChange={(value) => {
          setPassword(value);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          if (type === "sign-up") {
            createAccount();
          }
        }}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          marginTop: 25,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          {type === "sign-up" ? "Create Account" : "Sign In"}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ fontFamily: "outfit" }}>
          {type === "sign-up"
            ? "Already have an account?"
            : "You do not have an account?"}
        </Text>
        <Pressable
          onPress={() => {
            type === "sign-in"
              ? router.push("/auth/signUp")
              : router.push("/auth/signIn");
          }}
        >
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}>
            {type === "sign-up" ? "Sign In Here" : "Sign Up Here"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AuthForm;
