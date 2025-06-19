import { FullPageSpinner } from '@/components/commons/loaders/spinners';
import { COLORS } from '@/constants/colors';
import { useTheme } from '@/hooks/useThemeColor';
import { Comment } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Button from '../buttons/Button';
import CommentCard from '../cards/CommentCard';
import ThemedText from '../typography/ThemedText';

interface CommentListProps {
  comments: Comment[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  refetch?: () => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, isLoading, isError, error, refetch }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === 'light' ? COLORS.light : COLORS.dark;

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.backgroundMain }]}>
        <ThemedText style={[styles.errorText, { color: colors.error }]}>
          Error: {error?.message || 'Failed to load comments'}
        </ThemedText>
        <Button
          title="Retry"
          variant="primary"
          onPress={refetch}
          style={styles.retryButton}
        />
      </View>
    );
  }

  return (
    <ScrollView style={{ marginBottom: 16, paddingHorizontal: 20 }}>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <ThemedText style={{ color: colors.neutralTextSecondary, textAlign: 'center' }}>
          No comments yet
        </ThemedText>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    width: '50%',
  },
});

export default CommentList;