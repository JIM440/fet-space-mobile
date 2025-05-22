import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import { LocalSvg } from "react-native-svg/css";

const TabLayout = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryBase,
        tabBarInactiveTintColor: colors.neutralTextSecondary,
        // tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          borderTopWidth: 1,
          borderColor: colors.backgroundNeutral,
          backgroundColor: colors.backgroundMain,
        },
        tabBarLabelStyle: {
          textAlign: "center",
          fontSize: 12,
          // marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          title: "Courses",
          tabBarIcon: ({ color, focused, size }) => (
            <LocalSvg
              asset={
                focused
                  ? require("@/assets/icons/course_active.svg")
                  : resolvedTheme === "light"
                  ? require("@/assets/icons/course.svg")
                  : require("@/assets/icons/course_dark.svg")
              }
              color={color}
              width={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="announcements"
        options={{
          title: "Announcements",
          tabBarIcon: ({ color, focused, size }) => (
            <LocalSvg
              asset={
                focused
                  ? require("@/assets/icons/announcement_active.svg")
                  : resolvedTheme === "light"
                  ? require("@/assets/icons/announcement.svg")
                  : require("@/assets/icons/announcement_dark.svg")
              }
              color={color}
              width={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused, size }) => (
            <LocalSvg
              asset={
                focused
                  ? require("@/assets/icons/profile_active.svg")
                  : resolvedTheme === "light"
                  ? require("@/assets/icons/profile.svg")
                  : require("@/assets/icons/profile_dark.svg")
              }
              color={color}
              width={size}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
