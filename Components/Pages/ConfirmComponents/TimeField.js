import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import COLORS from "../../Styles/colors";

const TimeField = ({ onSubmitTime }) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      RequestTime: "",
    },
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    setSelectedTime(selectedDate);
    setValue("RequestTime", selectedDate.toISOString()); // Set the selected time in ISO format
  };

  const handlePressConfirm = () => {
    if (selectedTime) {
      handleSubmit(onSubmitTime)();
    } else {
      // Show an error message or handle it as needed
      console.error("Please select a time before confirming.");
    }
  };

  // Calculate the minimum date by adding 30 minutes to the current date
  const minimumDate = new Date();
  minimumDate.setMinutes(minimumDate.getMinutes() + 30);
  const maximumDate = new Date();
  maximumDate.setDate(maximumDate.getDate() + 2);

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
        Optional (Select this field only if you want to order for a specific
        time)
      </Text>
      <Text
        style={{
          fontSize: 25,
          paddingTop: 25,
        }}
      >
        Request Time
      </Text>
      <Pressable
        onPress={showDatePicker}
        style={{
          fontSize: 30,
          textAlign: "center",
          borderBottomWidth: 2,
          borderColor: COLORS.mainColor,
          paddingVertical: 8,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 20, color: COLORS.mainColor }}>
          {selectedTime ? "Change Selected Time: " : "Select Time"}
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.mainColor }}>
          {selectedTime
            ? selectedTime.toLocaleString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </Text>
      </Pressable>
      {errors.RequestTime && (
        <Text
          style={{
            color: "red",
            fontSize: 17,
          }}
        >
          This is required.
        </Text>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={minimumDate} // Set minimum date to the current date + 30 minutes
        maximumDate={maximumDate} // Set maximum date to 2 days after the current date
        minuteInterval={5} // Set the time interval to 5 minutes
        is24Hour={false} // Set to true if you want to use 24-hour format
      />
      <Pressable
        onPress={handlePressConfirm}
        style={{
          marginTop: 20,
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
          Confirm Request Time
        </Text>
      </Pressable>
    </View>
  );
};

export default TimeField;
