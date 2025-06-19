import AddCommentInput from '@/components/commons/inputs/AddCommentInput';
import ThemedText from '@/components/commons/typography/ThemedText';
import { COLORS } from '@/constants/colors';
import { useTheme } from '@/hooks/useThemeColor';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

interface RegularAnnouncementProps {
  id: string;
  title: string;
  content: string;
  date: string;
  comments?: number;
  author: { name: string; image: string };
  announcementType: 'general' | 'course';
}

const RegularAnnouncement: React.FC<RegularAnnouncementProps> = ({
  id,
  title,
  content,
  date,
  comments,
  author,
  announcementType,
}) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === 'light' ? COLORS.light : COLORS.dark;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
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
    >
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/candace_owens.jpg')}
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
        <ThemedText variant="body" numberOfLines={4}>
          {content}
        </ThemedText>
      </View>
      {comments === 0 || !comments ? (
        <AddCommentInput value="" onChangeText={() => {}} disabled={true} />
      ) : (
        <ThemedText
          variant="small"
          style={{
            color: colors.neutralTextTertiary,
            marginTop: 8,
            textAlign: 'right',
          }}
        >
          {comments || 0} comments
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});

export default RegularAnnouncement;