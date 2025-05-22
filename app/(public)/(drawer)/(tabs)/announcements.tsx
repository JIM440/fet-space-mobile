import renderAnnouncements from "@/components/commons/cards/renderAnnouncements";
import PageContainers from "@/components/commons/containers/PageContainer";
import TabHeader from "@/components/commons/navigation/TabHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { announcementsData } from "@/constants/static-data/announcements";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { ScrollView, View } from "react-native";


const AnnouncementsScreen = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  return (
    <PageContainers>
      <ScrollView>
        <TabHeader />
        <View style={{ padding: 10 }}>
          <ThemedText variant="h3">Announcements</ThemedText>
        </View>
        <View style={{ backgroundColor: colors.backgroundSecondary, gap: 20 }}>
          {announcementsData.map(renderAnnouncements)}
        </View>
      </ScrollView>
    </PageContainers>
  );
};

export default AnnouncementsScreen;