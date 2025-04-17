import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image
        source={require("./../assets/images/landing.png")}
        style={{
          width: "100%",
          height: 300,
          marginTop: 70,
        }}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: Colors.PRIMARY,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          padding: 25,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              color: Colors.WHITE,
              fontFamily: "outfit-bold",
            }}
          >
            Welcome to Coacing Guru
          </Text>

          <Text
            style={{
              fontSize: 20,
              color: Colors.WHITE,
              marginTop: 20,
              textAlign: "center",
              fontFamily: "outfit",
            }}
          >
            Transform your ideas into engaging educational content using this AI
            generating course app for your interviews and study!
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/auth/signUp")}
          >
            <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/auth/signIn")}
            style={[
              styles.button,
              {
                backgroundColor: Colors.PRIMARY,
                borderWidth: 1,
                borderColor: Colors.WHITE,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
              Already have an Account?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit",
  },
});
