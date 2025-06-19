import ThemedText from '@/components/commons/typography/ThemedText';
import { COLORS } from '@/constants/colors';
import { useTheme } from '@/hooks/useThemeColor';
import { Comment } from '@/types';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === 'light' ? COLORS.light : COLORS.dark;

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds}s`;
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;

    // For older than a week, show date as "MMM d"
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <View style={[styles.container]}>
      <Image
        source={require('@/assets/images/candace_owens.jpg')}
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
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <ThemedText
            numberOfLines={1}
            style={{ maxWidth: '95%', color: colors.neutralTextSecondary }}
          >
            {comment.author}
          </ThemedText>
          <ThemedText
            variant="caption"
            numberOfLines={1}
            style={{ color: colors.neutralTextSecondary }}
          >
            {formatTimestamp(comment.timestamp)}
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
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
    paddingVertical: 16,
  },
});

export default CommentCard;