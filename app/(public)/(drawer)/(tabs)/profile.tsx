import MoreItemsButton from "@/components/commons/buttons/MoreItemsButton";
import PageContainers from "@/components/commons/containers/PageContainer";
import TabHeader from "@/components/commons/navigation/TabHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import ItemLabelAndValue from "@/components/screens/profile/ItemLabelAndValue";
import ProfileOptionsModal from "@/components/screens/profile/ProfileOptionsModal";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { Image, View } from "react-native";

const Profile = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <PageContainers>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        {/* tab header */}
        <TabHeader />
        {/* profile header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
        >
          <ThemedText variant="h3">Profile</ThemedText>
          <MoreItemsButton onPress={toggleModal} />
        </View>
        {/* profile items container */}
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* row 1 */}
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
            }}
          >
            {/* profile image */}
            <View
              style={{
                backgroundColor: colors.backgroundSecondary,
                width: 105,
                height: 105,
                borderRadius: 120,
                padding: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("@/assets/images/candace_owens.jpg")}
                style={{
                  backgroundColor: colors.backgroundNeutral,
                  width: 100,
                  height: 100,
                  borderRadius: 120,
                }}
              />
            </View>

            <View style={{ gap: 6 }}>
              <ThemedText
                variant="h3"
                style={{ color: colors.neutralTextPrimary }}
              >
                Njeck Dorothy Ambe
              </ThemedText>
              <ThemedText
                style={{ fontSize: 15, color: colors.neutralTextPrimary }}
              >
                FE21A504
              </ThemedText>
              <ThemedText
                style={{ fontSize: 15, color: colors.neutralTextPrimary }}
              >
                B.eng Computer Engineering
              </ThemedText>
            </View>
          </View>
          {/* row 2 */}
          <View style={{ paddingHorizontal: 20, paddingVertical: 24, gap: 16 }}>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <ItemLabelAndValue label="Level:" value="200" />
              <ItemLabelAndValue label="Gender:" value="Male" />
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <ItemLabelAndValue
                label="Institutional Email:"
                value="njeckdorothy@ubuea.cm"
              />
              <ItemLabelAndValue
                label="Alternative Email:"
                value="njeckdorothy@gmail.com"
              />
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <ItemLabelAndValue label="Nationality:" value="Cameroon" />
              <ItemLabelAndValue label="Phone:" value="675829432" />
            </View>
          </View>
        </View>
      </View>
      <ProfileOptionsModal visible={modalVisible} onClose={toggleModal} />
    </PageContainers>
  );
};

export default Profile;
