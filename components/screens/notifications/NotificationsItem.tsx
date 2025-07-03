import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useMarkNotificationAsRead } from "@/hooks/api/notifications";
import { useTheme } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";

interface NotificationProps {
  id: string;
  image: string;
  type: string;
  code: string;
  time: string;
  description?: string;
  read: boolean;
  routeData: { path: string; params: Record<string, string> }; // Updated for string params
}

const NotificationsItem = ({
  notification,
  index,
  refetch,
}: {
  notification: NotificationProps;
  index?: number;
  refetch: () => void;
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const { mutate: markAsRead } = useMarkNotificationAsRead();

  const handlePress = () => {
    // Mark as read
    markAsRead(notification.id, {
      onSuccess: () => {
        refetch();
        // Navigate to the relevant page if routeData.path exists
        if (notification.routeData.path) {
          router.push({
            pathname: notification.routeData.path,
            params: notification.routeData.params,
          });
        }
      },
      onError: () => {
        // Navigate even if marking as read fails
        if (notification.routeData.path) {
          router.push({
            pathname: notification.routeData.path,
            params: notification.routeData.params,
          });
        }
      },
    });
  };

  // Custom image based on notification type
  const getImage = () => {
    if (notification.type.startsWith("Assignment"))
      return "https://via.placeholder.com/40/00FF00"; // Green
    if (notification.type.startsWith("Course Content"))
      return "https://via.placeholder.com/40/0000FF"; // Blue
    if (notification.type.startsWith("Course Announcement"))
      return "https://via.placeholder.com/40/FFFF00"; // Yellow
    if (notification.type.startsWith("Revision Question"))
      return "https://via.placeholder.com/40/FF0000"; // Red
    if (notification.type === "New Announcement")
      return "https://via.placeholder.com/40/FFA500"; // Orange
    return notification.image;
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: notification.read
          ? "transparent"
          : colors.backgroundLight,
        marginBottom: 1,
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: getImage() }}
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
            style={{
              maxWidth: "80%",
              fontWeight: notification.read ? "normal" : "bold",
            }}
          >
            {notification.type}
          </ThemedText>
          <ThemedText variant="caption">
            {new Date(notification.time).toLocaleTimeString()}
          </ThemedText>
        </View>
        <ThemedText
          variant="caption"
          numberOfLines={2}
          style={{ color: colors.neutralTextTertiary, maxWidth: "95%" }}
        >
          {notification.description}
        </ThemedText>
      </View>
    </Pressable>
  );
};

export default NotificationsItem;
