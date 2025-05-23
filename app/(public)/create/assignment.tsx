import AttachFileBtn from "@/components/commons/buttons/AttachFileBtn";
import Button from "@/components/commons/buttons/Button";
import PageContainers from "@/components/commons/containers/PageContainer";
import InputDescription from "@/components/commons/inputs/InputDescription";
import InputTitle from "@/components/commons/inputs/InputTitle";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const AddAssignment = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [files, setFiles] = useState<{ name: string; type: string }[]>([]);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleFileUpload = () => {
    const newFile = {
      name: `file-${files.length + 1}.pdf`,
      type: "application/pdf",
    };
    setFiles([...files, newFile]);
  };

  const handleSubmit = () => {
    router.back();
  };

  const getMinimumDate = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDate = new Date(
      dueDate.getFullYear(),
      dueDate.getMonth(),
      dueDate.getDate()
    );

    // If the selected date is today, restrict to current time or later
    if (selectedDate.getTime() === today.getTime()) {
      return now; // Restrict to current time or later today
    }
    // For future dates, allow any time (midnight of that date)
    return new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "set" && selectedDate) {
        // Date selected, now open time picker
        setDueDate(selectedDate);
        try {
          DateTimePickerAndroid.open({
            value: selectedDate,
            onChange: handleTimeChange,
            mode: "time",
            minimumDate: getMinimumDate(),
            display: "default",
          });
        } catch (error) {
          console.error("Error opening TimePicker:", error);
        }
      } else {
        // Dismissed date picker
        DateTimePickerAndroid.dismiss("date");
      }
    } else {
      // iOS: Handle datetime picker
      setShowDatePicker(false);
      if (selectedDate && event.type !== "dismissed") {
        setDueDate(selectedDate);
      }
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (event.type === "set" && selectedTime) {
      setDueDate(selectedTime);
    }
    // Dismiss time picker explicitly for Android
    if (Platform.OS === "android") {
      DateTimePickerAndroid.dismiss("time");
    }
  };

  const showDateTimePicker = () => {
    if (Platform.OS === "android") {
      try {
        DateTimePickerAndroid.open({
          value: dueDate,
          onChange: handleDateChange,
          mode: "date",
          minimumDate: new Date(), // Restrict to future dates
          display: "default",
        });
      } catch (error) {
        console.error("Error opening DatePicker:", error);
      }
    } else {
      setShowDatePicker(true);
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <PageContainers>
      <BackHeader title="Add Assignment" />
      <ScrollView
        style={{ width: "100%", paddingHorizontal: 20, marginTop: 30 }}
      >
        <InputTitle
          label="Title (Optional)"
          value={title}
          onChangeText={setTitle}
          onValidChange={setIsTitleValid}
          placeholder="Enter assignment title"
        />
        <InputDescription
          label="Description (Optional)"
          value={description}
          onChangeText={setDescription}
          onValidChange={setIsDescriptionValid}
          placeholder="Enter assignment description"
        />
        <ThemedText
          variant="body"
          style={{ color: colors.neutralTextSecondary, marginBottom: 4 }}
        >
          Due Date and Time:
        </ThemedText>
        <TouchableOpacity
          style={[
            styles.datePickerButton,
            {
              borderColor: colors.neutralBorder,
              backgroundColor: colors.backgroundNeutral,
            },
          ]}
          onPress={showDateTimePicker}
        >
          <ThemedText style={{ color: colors.neutralTextPrimary }}>
            {formatDateTime(dueDate)}
          </ThemedText>
        </TouchableOpacity>
        {showDatePicker && Platform.OS === "ios" && (
          <DateTimePicker
            value={dueDate}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
            minimumDate={getMinimumDate()}
            style={{ marginBottom: 16 }}
          />
        )}
        <AttachFileBtn title="Attach Files" onPress={handleFileUpload} />
        {files.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <ThemedText
              variant="body"
              style={{ color: colors.neutralTextSecondary }}
            >
              Attached Files:
            </ThemedText>
            {files.map((file, index) => (
              <ThemedText
                key={index}
                variant="small"
                style={{ color: colors.neutralTextPrimary }}
              >
                {file.name} ({file.type})
              </ThemedText>
            ))}
          </View>
        )}
        <Button
          title="Create Assignment"
          variant="primary"
          onPress={handleSubmit}
          style={{ marginTop: 40 }}
        />
      </ScrollView>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  datePickerButton: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default AddAssignment;
