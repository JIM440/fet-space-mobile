import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LocalSvg } from "react-native-svg/css";

const DrawerHeader = () => (
  <View style={styles.header}>
    <ThemedText
      style={{ fontSize: 28, fontWeight: 600, letterSpacing: 0.5 }}
      variant="h2"
    >
      FET SPACE
    </ThemedText>
  </View>
);

const ModalLayout = () => {
  const { resolvedTheme } = useTheme();

  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: colors.backgroundSecondary,
          },
          drawerInactiveTintColor: colors.neutralTextSecondary,
          drawerActiveTintColor: colors.primaryBase,
          drawerActiveBackgroundColor: colors.backgroundLight,
        }}
        drawerContent={(props) => (
          <>
            <DrawerHeader />
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          </>
        )}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="upcoming-deadlines"
          options={{
            drawerLabel: "Upcoming Deadlines",
            title: "Upcoming Deadlines",
            drawerIcon: ({ color, focused, size }) => (
              <LocalSvg
                asset={
                  focused
                    ? require("@/assets/icons/upcoming_deadlines_active.svg")
                    : resolvedTheme === "light"
                    ? require("@/assets/icons/upcoming_deadlines.svg")
                    : require("@/assets/icons/upcoming_deadlines_dark.svg")
                }
                color={color}
                width={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="about-fet"
          options={{
            drawerLabel: "About FET",
            title: "About FET",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="information-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="curriculums"
          options={{
            drawerLabel: "Curriculums",
            title: "Curriculums",
            drawerIcon: ({ color, focused, size }) => (
              <LocalSvg
                asset={
                  focused
                    ? require("@/assets/icons/curriculum_active.svg")
                    : resolvedTheme === "light"
                    ? require("@/assets/icons/curriculum.svg")
                    : require("@/assets/icons/curriculum_dark.svg")
                }
                color={color}
                width={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="help-and-support"
          options={{
            drawerLabel: "Help & Support",
            title: "Help & Support",
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    // paddingBottom: 20,
    paddingHorizontal: 20,
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 1,
  },
});

export default ModalLayout;
