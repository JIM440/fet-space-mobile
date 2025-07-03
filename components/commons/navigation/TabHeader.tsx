import { useGetNotifications } from "@/hooks/api/notifications";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/colors";
import { useTheme } from "../../../hooks/useThemeColor";

const TabHeader = () => {
  const { resolvedTheme } = useTheme();
  const navigation = useNavigation();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  // Fetch notifications
  const { data, isError } = useGetNotifications();

  // Calculate unread count from returned data
  const unreadCount = data?.filter((n) => !n.read).length ?? 0;

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.backgroundMain,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
        <TouchableOpacity onPress={openDrawer}>
          <SimpleLineIcons
            name="menu"
            size={24}
            color={colors.neutralTextSecondary}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginRight: 2,
        }}
        onPress={() => {
          router.push("/notifications");
        }}
      >
        <FontAwesome6
          name="bell"
          size={20}
          color={isError ? colors.error : colors.neutralTextSecondary}
          accessibilityLabel={`Notifications, ${unreadCount} unread`}
        />
        {unreadCount > 0 && (
          <View
            style={{
              backgroundColor: colors.error,
              borderRadius: 100,
              width: 16,
              height: 16,
              position: "absolute",
              top: -5,
              right: -8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, color: colors.white }}>
              {unreadCount > 99 ? "99+" : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TabHeader;