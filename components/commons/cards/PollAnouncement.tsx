import AddCommentInput from "@/components/commons/inputs/AddCommentInput";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    View
} from "react-native";
import PollOption from "./PollOption";

interface PollAnnouncementProps {
  title: string;
  content: string;
  date: string;
  comments?: number;
  author: { name: string; image: string };
  options: { text: string; votes: number }[];
  totalVotes: number;
  allowMultipleAnswers: boolean;
  index: number;
}

const PollAnnouncement: React.FC<PollAnnouncementProps> = ({
  title,
  content,
  date,
  comments,
  author,
  options,
  totalVotes,
  allowMultipleAnswers,
  index,
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const [pollSelections, setPollSelections] = useState<{
    [key: number]: string[];
  }>({});

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  const handlePollSelection = (optionText: string) => {
    setPollSelections((prev) => {
      const currentSelections = prev[index] || [];
      if (allowMultipleAnswers) {
        if (currentSelections.includes(optionText)) {
          return {
            ...prev,
            [index]: currentSelections.filter((opt) => opt !== optionText),
          };
        } else {
          return {
            ...prev,
            [index]: [...currentSelections, optionText],
          };
        }
      } else {
        if (currentSelections.includes(optionText)) {
          return {
            ...prev,
            [index]: [],
          };
        } else {
          return {
            ...prev,
            [index]: [optionText],
          };
        }
      }
    });
  };

  return (
    <Pressable
      style={[styles.item, { backgroundColor: colors.backgroundMain }]}
      onPress={() => {
        router.push("/login");
        alert(title);
      }}
    >
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/candace_owens.jpg")}
          style={{ ...styles.badge, backgroundColor: colors.backgroundNeutral }}
        />
        <View>
          <ThemedText variant="h4">Official Notice</ThemedText>
          <ThemedText variant="small">{formatDate(date)}</ThemedText>
        </View>
      </View>
      <View>
        <ThemedText
          variant="h2"
          style={{ marginBottom: 8, color: colors.neutralTextPrimary }}
        >
          {title}
        </ThemedText>
        <ThemedText variant="body" style={{ marginBottom: 8 }}>
          {content} (select {allowMultipleAnswers ? "one or more" : "one"})
        </ThemedText>
      </View>
      <View>
        {options.map((option, optIndex) => (
          <PollOption
            key={optIndex}
            option={option}
            totalVotes={totalVotes}
            isSelected={pollSelections[index]?.includes(option.text) || false}
            allowMultipleAnswers={allowMultipleAnswers}
            onSelect={() => handlePollSelection(option.text)}
            colors={colors}
          />
        ))}
      </View>
      {comments === 0 || !comments ? (
        <AddCommentInput value="" onChangeText={() => {}} disabled={true} />
      ) : (
        <ThemedText
          variant="small"
          style={{
            color: colors.neutralTextTertiary,
            marginTop: 8,
            textAlign: "right",
          }}
        >
          {comments} comments
        </ThemedText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});

export default PollAnnouncement;