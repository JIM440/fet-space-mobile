import Button from "@/components/commons/buttons/Button";
import MoreItemsButton from "@/components/commons/buttons/MoreItemsButton";
import PageContainers from "@/components/commons/containers/PageContainer";
import { FullPageSpinner } from "@/components/commons/loaders/spinners";
import TabHeader from "@/components/commons/navigation/TabHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import ItemLabelAndValue from "@/components/screens/profile/ItemLabelAndValue";
import ProfileOptionsModal from "@/components/screens/profile/ProfileOptionsModal";
import { COLORS } from "@/constants/colors";
import { useGetStudentDetails } from "@/hooks/api/student";
import { useTheme } from "@/hooks/useThemeColor";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

const Profile: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    data: student,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetStudentDetails();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Show toast on successful fetch
  useEffect(() => {
    if (isError && error) {
      Toast.show({
        type: "error",
        text2: error.message || "Failed to load profile",
      });
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <PageContainers>
        <TabHeader />
        <View style={styles.profileHeader}>
          <ThemedText variant="h3">Profile</ThemedText>
          <MoreItemsButton onPress={toggleModal} />
        </View>
        <FullPageSpinner />
        <ProfileOptionsModal visible={modalVisible} onClose={toggleModal} />
      </PageContainers>
    );
  }

  if (isError) {
    return (
      <PageContainers>
        <TabHeader />
        <View style={styles.profileHeader}>
          <ThemedText variant="h3">Profile</ThemedText>
          <MoreItemsButton onPress={toggleModal} />
        </View>
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: colors.backgroundMain },
          ]}
        >
          <ThemedText style={[styles.errorText]}>
            {"Error:" + error?.message || "Failed to load profile"}
          </ThemedText>
          <Button title="Retry" onPress={() => refetch()} />
        </View>
        <ProfileOptionsModal visible={modalVisible} onClose={toggleModal} />
      </PageContainers>
    );
  }

  return (
    <PageContainers>
      <View
        style={[styles.container, { backgroundColor: colors.backgroundMain }]}
      >
        {/* Tab header */}
        <TabHeader />
        {/* Profile header */}
        <View style={styles.profileHeader}>
          <ThemedText variant="h3">Profile</ThemedText>
          <MoreItemsButton onPress={toggleModal} />
        </View>
        {/* Profile items container */}
        <View style={styles.profileItems}>
          {/* Row 1 */}
          <View style={styles.profileRow}>
            {/* Profile image */}
            <View
              style={[
                styles.imageContainer,
                { backgroundColor: colors.backgroundSecondary },
              ]}
            >
              <Image
                source={require("@/assets/images/jim.jpg")}
                style={[
                  styles.profileImage,
                  { backgroundColor: colors.backgroundNeutral },
                ]}
              />
            </View>
            <View style={styles.profileInfo}>
              <ThemedText
                variant="h3"
                style={{ color: colors.neutralTextPrimary }}
              >
                {student?.name || "N/A"}
              </ThemedText>
              <ThemedText
                style={[
                  styles.infoText,
                  { color: colors.neutralTextSecondary },
                ]}
              >
                {student?.student.matricule_number || "N/A"}
              </ThemedText>
              <ThemedText
                style={[
                  styles.infoText,
                  { color: colors.neutralTextSecondary },
                ]}
              >
                B.eng Computer Engineering
              </ThemedText>
            </View>
          </View>
          {/* Row 2 */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <ItemLabelAndValue
                label="Level:"
                value={student?.student.level || "N/A"}
              />
              <ItemLabelAndValue label="Gender:" value="Male" />
            </View>
            <View style={styles.detailRow}>
              <ItemLabelAndValue
                label="Institutional Email:"
                value={student?.student.institutional_email || "N/A"}
              />
              <ItemLabelAndValue
                label="Alternative Email:"
                value={student?.email || "N/A"}
              />
            </View>
            <View style={styles.detailRow}>
              <ItemLabelAndValue
                label="Nationality:"
                value={student?.student.nationality || "N/A"}
              />
              <ItemLabelAndValue label="Phone:" value="675829432" />
            </View>
          </View>
        </View>
      </View>
      <ProfileOptionsModal visible={modalVisible} onClose={toggleModal} />
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    width: "50%",
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profileItems: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
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
    width: 100,
    height: 100,
    borderRadius: 120,
  },
  profileInfo: {
    gap: 6,
  },
  infoText: {
    fontSize: 15,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    gap: 16,
  },
});

export default Profile;
