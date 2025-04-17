import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from "react-native";
import React from "react";

interface TextInputParams {
  placeholder: string;
  isPassword?: boolean;
  onChange: (value: string) => void;
}

const CustomTextInput = ({
  placeholder,
  isPassword,
  onChange,
}: TextInputParams) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textInput}
      secureTextEntry={isPassword ? true : false}
      onChangeText={(value) => {
        onChange(value);
      }}
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
