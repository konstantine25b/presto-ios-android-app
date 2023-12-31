import React, { useContext } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Avatar } from "@react-native-material/core";
import {
  UserIcon,
  ClockIcon,
  CreditCardIcon,
  CogIcon,
  ChatBubbleLeftIcon,
  ArrowLeftOnRectangleIcon,
} from "react-native-heroicons/outline";
import COLORS from "../Styles/colors";
import { useNavigation } from "@react-navigation/native";
import ProfileSection from "./Components/ProfileSection";
import UserContext from "../Authentication/Context/UserContext";


export default function Profile() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            console.log("Logout confirmed");
            navigation.navigate("LogIn");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const context = useContext(UserContext);
  const user = context.user

  console.log(1, JSON.stringify(user._j, null, 2));
  let userName = user?.name;
  console.log(userName);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Avatar
          style={styles.avatar}
          label={userName}
          size={120}
          color={COLORS.mainColor}
        />
        <Text style={styles.username}>Hello, {userName} !</Text>
      </View>

      <ProfileSection
        color={COLORS.white}
        Icon={UserIcon}
        Title={"Account Information"}
      />
      <ProfileSection
        color={COLORS.white}
        Icon={ClockIcon}
        Title={"Order History"}
      />
      <ProfileSection
        color={COLORS.white}
        Icon={CreditCardIcon}
        Title={"Payment Methods"}
      />
      
      <ProfileSection color={COLORS.white} Icon={CogIcon} Title={"Settings"} />
      <ProfileSection
        color={COLORS.white}
        Icon={ChatBubbleLeftIcon}
        Title={"Contact Us"}
      />

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <View style={styles.logoutButtonContent}>
          <ArrowLeftOnRectangleIcon size={24} color={COLORS.white} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    gap: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 10,
  },

  logoutButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutButton: {
    alignItems: "center",
    backgroundColor: COLORS.redish,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    width: "50%",
    marginLeft: "2%",
  },
});
