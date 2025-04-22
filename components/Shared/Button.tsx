import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface ButtonProps {
  text: string;
  type?: "fill" | "outline";
  onPress?: () => void;
  loading?: boolean;
  loadingText?: string;
}

const Button = ({
  text,
  type = "fill",
  onPress,
  loading,
  loadingText,
}: ButtonProps) => {
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
      disabled={loading}
      onPress={onPress}
    >
      {!loading ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: type === "fill" ? Colors.WHITE : Colors.PRIMARY,
          }}
        >
          {text}
        </Text>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loadingText && (
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 10,
                color: Colors.PRIMARY,
              }}
            >
              {loadingText}
            </Text>
          )}
          <ActivityIndicator
            size="small"
            color={type === "fill" ? Colors.WHITE : Colors.PRIMARY}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
