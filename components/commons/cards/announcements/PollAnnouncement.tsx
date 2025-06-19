import AddCommentInput from "@/components/commons/inputs/AddCommentInput";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useRespondPoll } from "@/hooks/api/polls";
import { useTheme } from "@/hooks/useThemeColor";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import PollOption from "./PollOption";

interface PollAnnouncementProps {
  id: string;
  title: string;
  content: string;
  date: string;
  comments?: number;
  author: { name: string; image: string };
  options: { text: string; votes: number; optionId: number }[];
  totalVotes: number;
  allowMultipleAnswers: boolean;
  index: number;
  announcementType: "general" | "course";
  pollId: number;
  announcementId: number;
}

const PollAnnouncement: React.FC<PollAnnouncementProps> = ({
  id,
  title,
  content,
  date,
  comments,
  author,
  options,
  totalVotes,
  allowMultipleAnswers,
  index,
  announcementType,
  pollId,
  announcementId,
}) => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const [pollSelections, setPollSelections] = useState<string[]>([]);
  const { mutate: respondPoll, isPending } = useRespondPoll(announcementId);

  const isAnnouncementDetailPath =
    pathname.includes("/announcement/") ||
    pathname.includes("/course-announcement");

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  const handlePollSelection = (optionText: string, optionId: number) => {
    setPollSelections((prev) => {
      if (allowMultipleAnswers) {
        if (prev.includes(optionText)) {
          return prev.filter((opt) => opt !== optionText);
        } else {
          return [...prev, optionText];
        }
      } else {
        if (prev.includes(optionText)) {
          return [];
        } else {
          return [optionText];
        }
      }
    });

    respondPoll({ pollId, optionId });
  };

  return (
    <Pressable
      style={[styles.item, { backgroundColor: colors.backgroundMain }]}
      onPress={() => {
        router.push({
  pathname: announcementType === "course"
    ? "/course-announcement/[id]"
    : "/announcement/[id]",
  params: { id: id.toString() },
});

      }}
      disabled={isAnnouncementDetailPath}
    >
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/candace_owens.jpg")}
          style={{ ...styles.badge, backgroundColor: colors.backgroundNeutral }}
        />
        <View>
          <ThemedText variant="h4">{author.name}</ThemedText>
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
            option={{ ...option, votes: option.votes }}
            totalVotes={totalVotes}
            isSelected={pollSelections.includes(option.text)}
            allowMultipleAnswers={allowMultipleAnswers}
            onSelect={() => handlePollSelection(option.text, option.optionId)}
            colors={colors}
          />
        ))}
      </View>
      {(comments === 0 || !comments) && !isAnnouncementDetailPath ? (
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
