import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

interface TextInputParams {
  placeholder: string;
  isPassword?: boolean;
}

const CustomTextInput = ({ placeholder, isPassword }: TextInputParams) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textInput}
      secureTextEntry={isPassword ? true : false}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});

export default CustomTextInput;
