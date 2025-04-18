import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  TextInputProps,
} from "react-native";
import React from "react";

interface TextInputParams extends TextInputProps {
  placeholder: string;
  isPassword?: boolean;
  customStyles?: any;
  onChangeValue: (value: string) => void;
}

const CustomTextInput = ({
  placeholder,
  isPassword = false,
  onChangeValue,
  customStyles,
  ...props
}: TextInputParams) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={customStyles || styles.textInput}
      secureTextEntry={isPassword ? true : false}
      onChangeText={(value) => {
        onChangeValue(value);
      }}
      {...props}
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
