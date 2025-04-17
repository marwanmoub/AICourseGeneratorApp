import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import CustomTextInput from "@/components/FormComponents/CustomTextInput";
import { useRouter } from "expo-router";
import AuthForm from "@/components/FormComponents/AuthForm";

const SignUp = () => {
  return <AuthForm type="sign-up" />;
};
export default SignUp;
