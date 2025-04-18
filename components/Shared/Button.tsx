import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface ButtonProps {
  text: string;
  type?: "fill" | "outline";
  onPress?: () => void;
}

const Button = ({ text, type = "fill", onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        padding: 15,
        width: "100%",
        borderRadius: 15,
        marginTop: 15,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: type === "fill" ? Colors.PRIMARY : Colors.WHITE,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          color: type === "fill" ? Colors.WHITE : Colors.PRIMARY,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
