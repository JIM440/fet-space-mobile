import Button from '@/components/commons/buttons/Button';
import PollAnnouncement from '@/components/commons/cards/announcements/PollAnnouncement';
import CommentInput from '@/components/commons/comments/CommentInputRow';
import CommentList from '@/components/commons/comments/CommentsList';
import PageContainers from '@/components/commons/containers/PageContainer';
import { FullPageSpinner } from '@/components/commons/loaders/spinners';
import { BackHeader } from '@/components/commons/navigation/BackHeader';
import ThemedText from '@/components/commons/typography/ThemedText';
import { COLORS } from '@/constants/colors';
import { useGeneralGetAnnouncementDetails } from '@/hooks/api/announcements';
import { useCreateComment, useGetComments } from '@/hooks/api/comments';
import { useTheme } from '@/hooks/useThemeColor';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

const GeneralAnnouncement = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === 'light' ? COLORS.light : COLORS.dark;
    // const { id: announcementId } = useLocalSearchParams();
    const { id } = useLocalSearchParams();
const announcementId = Number(id);

    // console.log(announcementId, 'announcementId from params');


  const { announcement, isLoading, isError, error, refetch } = useGeneralGetAnnouncementDetails(announcementId);

  const { comments, isLoading: commentsLoading, isError: commentsError, error: commentsErrorObj, refetch: refetchComments } = useGetComments({
    type: 'generalAnnouncement',
    targetId: announcementId,
  });

  const createComment = useCreateComment(announcementId, 'generalAnnouncement');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  if (!announcementId || isLoading) {
    return <PageContainers>
    <BackHeader title='' />
    <FullPageSpinner />;
    </PageContainers>
  }

  if (!isLoading && !announcement && isError) {
    return (
      <PageContainers>
        <BackHeader title="" />
        <View style={[styles.errorContainer, { backgroundColor: colors.backgroundMain }]}>
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Error: {error?.message || 'Failed to load announcement'}
          </ThemedText>
          <Button
            title="Retry"
            variant="primary"
            onPress={() => {
              refetch();
              refetchComments();
            }}
            style={styles.retryButton}
          />
        </View>
      </PageContainers>
    );
  }

  const author = {
    name: announcement?.admin?.user.name,
    image: announcement?.admin?.user.image,
  };

  return (
    <PageContainers>
      <BackHeader title='' />
      <ScrollView style={{ paddingVertical: 16 }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.neutralBorder,
            marginBottom: 20,
          }}
        >
          {announcement?.is_poll ? (
            <PollAnnouncement
              id={announcement?.announcement_id.toString()}
              title={announcement?.title}
              content={announcement?.content}
              date={announcement?.created_at}
              // comments={10}
              comments={comments.length || 0}
              author={author}
              options={announcement?.Polls[0].options.map((opt) => ({
                text: opt.text,
                votes: opt.votes,
                optionId: opt.option_id,
              }))}
              totalVotes={announcement?.Polls[0].options.reduce((sum, opt) => sum + opt.votes, 0)}
              allowMultipleAnswers={announcement?.Polls[0].allow_multiple_answers}
              index={0}
              announcementType="general"
              pollId={announcement?.Polls[0].poll_id}
              announcementId={announcement?.announcement_id}
            />
          ) : (
            <View style={{ ...styles.container, paddingHorizontal: 20 }}>              <View style={styles.header}>
                <Image
                  source={author.image ? { uri: author.image } : require('@/assets/images/candace_owens.jpg')}
                  style={{ ...styles.badge, backgroundColor: colors.backgroundNeutral }}
                />
                <View>
                  <ThemedText variant="h4">{author.name}</ThemedText>
                  <ThemedText variant="small">{formatDate(announcement?.created_at)}</ThemedText>
                </View>
              </View>
              <View style={{ marginBottom: 16 }}>
                <ThemedText
                  variant="h2"
                  style={{ marginBottom: 8, color: colors.neutralTextPrimary }}
                >
                  {announcement?.title}
                </ThemedText>
                <ThemedText variant="body">{announcement?.content}</ThemedText>
                {announcement?.attachments.length > 0 && (
                  <View style={{ marginTop: 16, gap: 8 }}>
                    {announcement?.attachments.map((file, index) => (
                      <FileCard
                        key={index}
                        file={{
                          name: file.filename,
                          type: file.filename.split('.').pop() || 'file',
                          pages: file.pages || 0,
                          size: file.size || 'Unknown',
                        }}
                      />
                    ))}
                  </View>
                )}
                <ThemedText
                  variant="small"
                  style={{
                    color: colors.neutralTextTertiary,
                    marginVertical: 16,
                    textAlign: 'right',
                  }}
                >
                  {announcement?._count.comments + ' comments'}
                </ThemedText>
              </View>
            </View>
          )}
        </View>
        <CommentList
          comments={comments}
          isLoading={commentsLoading}
          isError={commentsError}
          error={commentsErrorObj}
          refetch={refetchComments}
        />
      </ScrollView>
      <CommentInput
        type_id={announcement?.announcement_id.toString()}
        type="generalAnnouncement"
        onSubmit={(content) =>
          createComment.mutate({ type: 'generalAnnouncement', targetId: announcementId, content })
        }
      />
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
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

export default GeneralAnnouncement;