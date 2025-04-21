import { auth, db } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";
import { UserDetailedContext } from "@/context/UserDetailContext";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const { setUserDetail } = useContext(UserDetailedContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email) {
          const userDocRef = doc(db, "users", user.email);
          try {
            setLoading(true);
            const result = await getDoc(userDocRef);
            if (result.exists()) {
              setUserDetail(result.data());
              setLoading(false);
              router.replace("/(tabs)/home");
            }
          } catch (error) {
            setLoading(false);
            console.error("Error fetching user document:", error);
          }
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.WHITE,
        }}
      >
        <ActivityIndicator size={30} color={Colors.PRIMARY} />
      </View>
    );
  }

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
            Welcome to Coaching Guru
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
            generating course app!
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
