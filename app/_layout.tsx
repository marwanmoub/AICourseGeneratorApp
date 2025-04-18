import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import UserDetailContext from "@/context/UserDetailContext";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  useFonts({
    oswald: require("./../assets/fonts/Oswald-Regular.ttf"),
    "oswald-bold": require("./../assets/fonts/Oswald-Bold.ttf"),
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <UserDetailContext>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Toast />
    </UserDetailContext>
  );
}
