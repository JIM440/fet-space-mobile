import renderAnnouncements from "@/components/commons/cards/announcements/renderAnnouncements";
import { COLORS } from "@/constants/colors";
import { courseAnnouncementsData } from "@/constants/static-data/announcements";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";

const Announcements = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  return (
    <View>
      <View style={{ backgroundColor: colors.backgroundSecondary, gap: 20 }}>
        {courseAnnouncementsData.map(renderAnnouncements)}
      </View>
    </View>
  );
};

export default Announcements;
