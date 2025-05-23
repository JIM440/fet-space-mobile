// components/ProfileCard.js
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { userProps } from "@/types";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../typography/ThemedText";

const ProfileCard = ({
  user,
  type,
}: {
  user: userProps;
  type: "student" | "teacher";
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        router.push(`/user/${user.id}` as RelativePathString);
      }}
    >
      <Image
        source={{ uri: user.imageUri }}
        style={{ ...styles.image, backgroundColor: colors.backgroundNeutral }}
      />
      <View>
        <ThemedText variant="h4">{user.name}</ThemedText>
        {type === "student" && (
          <ThemedText style={{ color: colors.neutralTextTertiary }}>
            {user.matricule}
          </ThemedText>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 16,
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 8,
  },
});

export default ProfileCard;
