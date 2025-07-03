import PageContainers from "@/components/commons/containers/PageContainer";
import { BackHeader } from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import {
  useGetStudentDetails as useEditStudent,
  useGetStudentDetails,
} from "@/hooks/api/student";
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from "react-native";

import Button from "@/components/commons/buttons/Button";
import { FullPageSpinner } from "@/components/commons/loaders/spinners";
import { useTheme } from "@/hooks/useThemeColor";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const EditProfile: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const navigation = useNavigation();
  const { data: student, isLoading } = useGetStudentDetails();
  const { mutate: editStudent } = useEditStudent();
  const [form, setForm] = useState({
    name: "",
    matricule_number: "",
    level: "",
    institutional_email: "",
    email: "",
    nationality: "",
    phone_number: "",
  });

  // Initialize form with student data or dummy data
  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || "User Name",
        matricule_number: student.student.matricule_number || "XX00A000",
        level: student.student.level || "100",
        institutional_email:
          student.student.institutional_email || "user@institution.edu",
        email: student.email || "user@example.com",
        nationality: student.student.nationality || "Unknown",
        phone_number: student.phone_number || "000000000",
      });
    } else {
      // Dummy data if request fails or no data
      setForm({
        name: "User Name",
        matricule_number: "XX00A000",
        level: "100",
        institutional_email: "user@institution.edu",
        email: "user@example.com",
        nationality: "Unknown",
        phone_number: "000000000",
      });
    }
  }, [student]);

  // Handle save
  const handleSave = () => {
    if (!student?.user_id) {
      Toast.show({
        type: "error",
        text2: "Invalid student ID",
      });
      return;
    }
    editStudent(
      {
        studentId: student.user_id.toString(),
        data: {
          level: form.level,
          phone_number: form.phone_number || undefined,
        },
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text2: "Profile updated successfully",
          });
          navigation.goBack();
        },
        onError: (err: any) => {
          Toast.show({
            type: "error",
            text2: err.message || "Failed to update profile",
          });
        },
      }
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <PageContainers>
        <BackHeader
          title="Edit Profile"
        />
        <FullPageSpinner />
      </PageContainers>
    );
  }

  return (
    <PageContainers>
      {/* Header with Back and Save buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BackHeader title="Edit Profile" />
        <Button title='Save' onPress={handleSave}  />
      </View>
      <ScrollView contentContainerStyle={[styles.container]} style={{}}>
        {/* Profile image */}
        <View style={styles.imageWrapper}>
          <View
            style={[
              styles.imageContainer,
              { backgroundColor: colors.backgroundSecondary },
            ]}
          >
            <Image
              source={require("@/assets/images/candace_owens.jpg")}
              style={[
                styles.profileImage,
                { backgroundColor: colors.backgroundNeutral },
              ]}
            />
          </View>
        </View>
        {/* Profile fields */}
        <View style={styles.detailsContainer}>
          <ThemedText style={styles.editableNote}>
            Only Level and Phone Number can be edited.
          </ThemedText>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Name:</ThemedText>
            <TextInput
              value={form.name}
              editable={false}
              selectable={false}
              style={[
                styles.input,
                styles.disabledInput,
                {
                  backgroundColor: colors.backgroundNeutral,
                  color: colors.neutralTextPrimary,
                },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Matricule Number:</ThemedText>
            <TextInput
              value={form.matricule_number}
              editable={false}
              selectable={false}
              style={[
                styles.input,
                styles.disabledInput,
                {
                  backgroundColor: colors.backgroundNeutral,
                  color: colors.neutralTextPrimary,
                },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Program:</ThemedText>
            <ThemedText
              style={[
                styles.input,
                styles.disabledInput,
                {
                  backgroundColor: colors.backgroundNeutral,
                  color: colors.neutralTextPrimary,
                },
              ]}
            >
              B.eng Computer Engineering
            </ThemedText>
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Level:</ThemedText>
            <Picker
              selectedValue={form.level}
              onValueChange={(value) => setForm({ ...form, level: value })}
              style={[styles.input, { color: colors.neutralTextPrimary, width: 125 }]}
              dropdownIconColor={colors.neutralTextPrimary}
            >
              <Picker.Item label="100" value="100" />
              <Picker.Item label="200" value="200" />
              <Picker.Item label="300" value="300" />
              <Picker.Item label="400" value="400" />
              <Picker.Item label="500" value="500" />
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Gender:</ThemedText>
            <TextInput
              value="Male"
              editable={false}
              selectable={false}
              style={[
                styles.input,
                styles.disabledInput,
                {
                  backgroundColor: colors.backgroundNeutral,
                  color: colors.neutralTextPrimary,
                },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Institutional Email:</ThemedText>
            <TextInput
              value={form.institutional_email}
              editable={false}
              selectable={false}
              style={[
                styles.input,
                styles.disabledInput,
                {
                  backgroundColor: colors.backgroundNeutral,
                  color: colors.neutralTextPrimary,
                },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Alternative Email:</ThemedText>
            <TextInput
              value={form.email}
              editable={false}
              selectable={false}
              style={[
                styles.input,
                styles.disabledInput,
                {
                  backgroundColor: colors.backgroundNeutral,
                  color: colors.neutralTextPrimary,
                },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Nationality:</ThemedText>
            <TextInput
              value={form.nationality}
              editable={false}
              selectable={false}
              style={[
                styles.input,
                styles.disabledInput,
                {
                  backgroundColor: colors.backgroundNeutral,
                  color: colors.neutralTextPrimary,
                },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Phone:</ThemedText>
            <TextInput
              value={form.phone_number}
              onChangeText={(text) => setForm({ ...form, phone_number: text })}
              style={[
                styles.input,
                {
                  backgroundColor: colors.backgroundNeutral,
                  color: colors.neutralTextPrimary,
                },
              ]}
              placeholder="Phone Number"
              placeholderTextColor={colors.neutralTextSecondary}
            />
          </View>
        </View>
      </ScrollView>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  imageWrapper: {
    alignItems: "center",
    paddingVertical: 16,
  },
  imageContainer: {
    width: 105,
    height: 105,
    borderRadius: 120,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 140,
    marginTop: 20
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 20,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderRadius: 5,
    padding: 12,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  disabledInput: {
    opacity: 0.7,
  },
  saveButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  editableNote: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default EditProfile;
