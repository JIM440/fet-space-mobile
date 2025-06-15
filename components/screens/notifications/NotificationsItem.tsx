import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { Image, View } from "react-native";

interface notificationProps {
  id: string;
  image: string;
  type: string;
  code: string;
  time: string;
  description?: string;
  read: boolean;
}

const NotificationsItem = ({
  notification,
  index,
}: {
  notification: notificationProps;
  index?: number;
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: notification.read
          ? "transparent"
          : colors.backgroundLight,
        marginBottom: 1,
        gap: 8,
        flexDirection: "row",
      }}
    >
      <Image
        source={{ uri: notification.image }}
        style={{
          width: 40,
          height: 40,
          backgroundColor: colors.backgroundNeutral,
          borderRadius: 100,
        }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText
            variant="body"
            numberOfLines={1}
            style={{ maxWidth: "95%" }}
          >
            {notification.type}{" "}
            <ThemedText>posted in {notification.code}</ThemedText>
          </ThemedText>
          <ThemedText variant="caption">{notification.time}</ThemedText>
        </View>
        <ThemedText
          variant="caption"
          numberOfLines={1}
          style={{ color: colors.neutralTextTertiary, maxWidth: "95%" }}
        >
          {notification.description}
        </ThemedText>
      </View>
    </View>
  );
};

export default NotificationsItem;
