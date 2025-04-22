import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Plan, subscriptionPlans } from "@/constants/Option";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserDetailedContext } from "@/context/UserDetailContext";
import Button from "@/components/Shared/Button";
import Toast from "react-native-toast-message";

const SubscriptionWall = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const router = useRouter();

  const { userDetail, setUserDetail } = useContext(UserDetailedContext);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleSubscribe = async () => {
    if (userDetail?.member === false) {
      setLoading(true);
      try {
        if (selectedPlanId) {
          await updateDoc(doc(db, "users", userDetail?.email), {
            member: true,
          }).then(async () => {
            await getDoc(doc(db, "users", userDetail?.email)).then(
              (response) => {
                if (response) {
                  setUserDetail(response.data());
                  Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Subscribed Successfully",
                    visibilityTime: 2000,
                  });
                  router.replace("/(tabs)/home");
                }
                setLoading(false);
              }
            );
          });
        }
      } catch (err) {
        setLoading(false);
        console.error(err);
        throw err;
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: "You are already a member!",
        visibilityTime: 3000,
      });
      router.replace("/(tabs)/home");
      return;
    }
  };

  const renderPlanItem = ({ item }: { item: Plan }) => (
    <TouchableOpacity
      style={[
        styles.planContainer,
        selectedPlanId === item.id && styles.selectedPlan,
        item.bestValue && styles.bestValuePlan,
      ]}
      onPress={() => handleSelectPlan(item.id)}
    >
      {item.bestValue && (
        <View style={styles.bestValueBadge}>
          <Text style={styles.bestValueBadgeText}>Best Value</Text>
        </View>
      )}
      <Text style={styles.tierText}>{item.tier}</Text>
      <Text style={styles.cycleText}>{item.cycle}</Text>
      <Text style={styles.priceText}>{item.price}</Text>
      <View style={styles.featuresContainer}>
        {item.features.map((feature, index) => (
          <Text key={index} style={styles.featureText}>
            • {feature}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("./../assets/images/banner3.png")}
          style={styles.headerImage}
          resizeMode="cover"
        />

        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.WHITE} />{" "}
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Choose Your Plan</Text>
      <Text style={styles.subtitle}>
        Unlock full access with a subscription.
      </Text>

      <FlatList
        data={subscriptionPlans}
        renderItem={renderPlanItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {selectedPlanId && (
        <View
          style={{
            width: "85%",
          }}
        >
          <Button text="Subscibe" onPress={handleSubscribe} loading={loading} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,

    paddingBottom: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.BLACK,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  listContent: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 15,
  },
  planContainer: {
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 10,
    padding: 15,
    width: "45%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    position: "relative",
  },
  selectedPlan: {
    borderColor: Colors.PRIMARY,
  },
  bestValuePlan: {
    borderColor: Colors.GREEN,
    backgroundColor: Colors.LIGHT_GREEN,
  },
  bestValueBadge: {
    position: "absolute",
    top: -10,
    backgroundColor: Colors.GREEN,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
    zIndex: 1,
  },
  bestValueBadgeText: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: "bold",
  },
  tierText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.BLACK,
  },
  cycleText: {
    fontSize: 16,
    color: Colors.GRAY,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    marginBottom: 15,
  },
  featuresContainer: {
    alignSelf: "flex-start",
  },
  featureText: {
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 3,
  },
  subscribeButton: {
    marginTop: 20,
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  subscribeButtonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SubscriptionWall;
