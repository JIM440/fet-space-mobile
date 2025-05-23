import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { Comment } from "@/types";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  return (
    <View style={[styles.container]}>
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 60,
          backgroundColor: colors.backgroundNeutral,
        }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <ThemedText
            numberOfLines={1}
            style={{ maxWidth: "95%", color: colors.neutralTextSecondary }}
          >
            {comment.author}
          </ThemedText>
          <ThemedText
            variant="caption"
            numberOfLines={1}
            style={{ color: colors.neutralTextSecondary }}
          >
            {comment.timestamp}
          </ThemedText>
        </View>
        <ThemedText style={{ color: colors.neutralTextPrimary }}>
          {comment.text}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
    paddingVertical: 16,
  },
});

export default CommentCard;
