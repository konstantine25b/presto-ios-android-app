import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import COLORS from "../../Styles/colors";

export default function TableNum({ onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      TableNumber: "",
    },
  });

  return (
    <View
      style={{
        width: "96%",
        marginLeft: "2%",
        borderRadius: 10,
        marginVertical: 10,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text
        style={{
          position: "absolute",
          top: 18,
          left: 15,
          color: "#FFA500", // orange color
          fontStyle: "italic", // Make the text italic
        }}
      >
        Optional (Select this field only if you are at the restaurant)
      </Text>
      <Text
        style={{
          fontSize: 25,
          paddingTop: 25,
        }}
      >
        Table Number
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{
              fontSize: 30,
              textAlign: "center",
              borderBottomWidth: 2, // Increase the border width
              borderColor: COLORS.mainColor, // Match the button color
              paddingVertical: 8, // Add padding to the input
              marginBottom: 15, // Add some margin to separate from the button
            }}
            placeholder="00"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="TableNumber"
      />

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: COLORS.mainColor,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          elevation: 3,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Confirm Table Number
        </Text>
      </Pressable>
    </View>
  );
}
