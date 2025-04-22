import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { UserDetailedContext } from "@/context/UserDetailContext";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProfileMenu } from "@/constants/Option";

interface Menu {
  name: string;
  icon: string;
  path: string;
}

const Profile = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailedContext);
  const router = useRouter();

  const onMenuClick = (menu: Menu) => {
    if (menu?.name === "Logout") {
      signOut(auth).then(() => {
        setUserDetail(null);
        router.push("/");
      });
    } else {
      router.push(menu?.path);
    }
  };

  const renderMenuItem = ({ item }: { item: Menu }) => (
    <Pressable onPress={() => onMenuClick(item)}>
      <View
        style={{
          marginTop: 10,
          elevation: 1,
          backgroundColor: Colors.WHITE,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            padding: 10,
            backgroundColor: Colors.WHITE,
          }}
        >
          <View
            style={{
              padding: 5,
              backgroundColor: Colors.BG_GRAY,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 20,
            }}
          >
            <Ionicons name={item?.icon} size={20} color={Colors.PRIMARY} />
          </View>
          <Text>{item?.name}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 35,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
        }}
      >
        Profile
      </Text>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("./../../assets/images/icon.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          {userDetail?.name}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit",
            color: Colors.GRAY,
            fontSize: 18,
          }}
        >
          {userDetail?.email}
        </Text>
      </View>

      <FlatList
        data={ProfileMenu}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default Profile;
