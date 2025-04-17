import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import CustomTextInput from "./CustomTextInput";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

const AuthForm = ({ type = "sign-up" }) => {
  const router = useRouter();
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

      {type === "sign-up" && <CustomTextInput placeholder="Full Name" />}
      <CustomTextInput placeholder="Email" />
      <CustomTextInput placeholder="Password" isPassword />

      <TouchableOpacity
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
          Create Account
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
