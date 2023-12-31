import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import COLORS from "../../Styles/colors";

export default function ProfileSection({ Title, Icon, color }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.section,
        {
          backgroundColor: pressed ? COLORS.mainColor : COLORS.mainColor,
        },
      ]}
      android_ripple={{ color: COLORS.rippleEffect }}
      onPress={() => {
        navigateToSection(Title);
      }}
    >
      <View style={styles.contentWrapper}>
        <View style={[styles.iconWrapper, { backgroundColor: color }]}>
          <Icon size={24} color={COLORS.mainColor} />
        </View>
        <Text style={styles.sectionTitle}>{Title}</Text>
      </View>
      <ArrowRightIcon size={24} color={COLORS.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    borderRadius: 15,
    padding: 15,
    shadowColor: COLORS.light2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    width: "96%",
    marginLeft: "2%",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginLeft: 10,
  },
});
