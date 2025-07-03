import AddCommentInput from '@/components/commons/inputs/AddCommentInput';
import ThemedText from '@/components/commons/typography/ThemedText';
import { COLORS } from '@/constants/colors';
import { useTheme } from '@/hooks/useThemeColor';
import { getTimeAgo } from '@/utils/dateFormatter';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

interface RegularAnnouncementProps {
  id: string;
  title: string;
  content: string;
  date: string;
  comments?: number;
  author: { name: string; image: string };
  announcementType: 'general' | 'course';
  attachments?: { filename: string; size?: string; pages?: number }[];
  isAdmin?: boolean;
  onEdit?: (id: number, title: string, content: string) => void;
  onDelete?: (id: number) => void;
}

const RegularAnnouncement: React.FC<RegularAnnouncementProps> = ({
  id,
  title,
  content,
  date,
  comments,
  author,
  announcementType,
  attachments,
  isAdmin,
  onEdit,
  onDelete,
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
          pathname: announcementType === 'course'
            ? '/course-announcement/[id]'
            : '/announcement/[id]',
          params: { id: id.toString() },
        });
      }}
    >
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image
            source={announcementType === 'course' ?  require('@/assets/images/fozin.jpg') : require('@/assets/images/valerie.jpg')}
            style={{ ...styles.badge, backgroundColor: colors.backgroundNeutral }}
          />
          <View>
            <ThemedText variant="h4">{author.name}</ThemedText>
            <ThemedText variant="small">{getTimeAgo(date)}</ThemedText>
          </View>
        </View>
        {isAdmin && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onEdit?.(Number(id), title, content)}>
              <ThemedText style={{ color: colors.primaryBase }}>Edit</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete?.(Number(id))}>
              <ThemedText style={{ color: colors.error }}>Delete</ThemedText>
            </TouchableOpacity>
          </View>
        )}
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
        {attachments?.length > 0 && (
          <ThemedText
            variant="small"
            style={{ color: colors.neutralTextSecondary, marginTop: 8 }}
          >
            {attachments.length} attachments
          </ThemedText>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
});

export default RegularAnnouncement;