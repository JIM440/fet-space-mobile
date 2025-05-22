import renderAnnouncements from "@/components/commons/cards/renderAnnouncements";
import { COLORS } from "@/constants/colors";
import { announcementsData } from "@/constants/static-data/announcements";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";

const Announcements = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  return (
    <View>
      <View style={{ backgroundColor: colors.backgroundSecondary, gap: 20 }}>
        {announcementsData.map(renderAnnouncements)}
      </View>
    </View>
  );
};

export default Announcements;
