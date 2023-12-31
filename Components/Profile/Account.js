import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  LockClosedIcon,
  PhoneIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import COLORS from "../Styles/colors";
import AccountSection from "./AccountComponents/AccountSection";
import UserContext from "../Authentication/Context/UserContext";

export default function Account() {
  const navigateToSection = (str) => {
    console.log(str);
  };

  const context = useContext(UserContext);
  const user = context.user;
  const userName = user?.name
  const email = user?.email;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.userHeader}>
          <UserIcon size={40} color={COLORS.mainColor} style={styles.userIcon} />
          <Text style={styles.greeting}>{userName}</Text>
        </View>
        <Text style={styles.email}>{email}</Text>
      </View>

      <AccountSection
        Icon={LockClosedIcon}
        Title={"Edit Password"}
        onPress={() => navigateToSection("Edit Password")}
      />
      <AccountSection
        Icon={PhoneIcon}
        Title={"Edit Phone Number"}
        onPress={() => navigateToSection("Edit Phone Number")}
      />
      <AccountSection
        Icon={CreditCardIcon}
        Title={"Payment Methods"}
        onPress={() => navigateToSection("Payment Methods")}
      />
      <AccountSection
        Icon={ShieldCheckIcon}
        Title={"Manage Privacy"}
        onPress={() => navigateToSection("Manage Privacy")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userIcon: {
    marginRight: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  email: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 5,
  },
});
