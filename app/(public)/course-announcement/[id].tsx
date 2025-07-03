import Button from "@/components/commons/buttons/Button";
import PollAnnouncement from "@/components/commons/cards/announcements/PollAnnouncement";
import FileCard from "@/components/commons/cards/FileCard";
import CommentInput from "@/components/commons/comments/CommentInputRow";
import CommentList from "@/components/commons/comments/CommentsList";
import PageContainers from "@/components/commons/containers/PageContainer";
import { FullPageSpinner } from "@/components/commons/loaders/spinners";
import { BackHeader } from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import api from "@/constants/appBaseUrl";
import { COLORS } from "@/constants/colors";
import { useCourseAnnouncementDetails } from "@/hooks/api/announcements";
import { useCreateComment, useGetComments } from "@/hooks/api/comments";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useThemeColor";
import { getTimeAgo } from "@/utils/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";

interface PollResponse {
  user_id: number;
  poll_option_id: number;
  created_at: string;
}

interface Comment {
  id: number;
  content: string;
  user: { name: string; image?: string };
  created_at: string;
}

interface AnnouncementsProps {
  context: {
    courseId: string | undefined;
    announcementId: string;
  };
}

const usePollResponsesForAnnouncement = (pollId: number | null, userId: number) => {
  const queries = useQuery({
    queryKey: ['pollResponses', pollId],
    queryFn: () => api.get(`/polls/${pollId}/responses`).then((res) => res.data),
    enabled: !!pollId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    data: queries.data || [],
    hasVoted: queries.data?.some((r: PollResponse) => r.user_id === userId) || false,
  };
};

const CourseAnnouncement: React.FC<AnnouncementsProps> = ({ context }) => {
  const { id: announcementId } = useLocalSearchParams();
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const { user } = useAuth();
  const currentUserId = user?.user_id || 1; // Fallback to 1 if auth fails
  const {
    data: announcement,
    isLoading,
    isError,
    error,
    refetch,
  } = useCourseAnnouncementDetails(parseInt(announcementId));
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
    error: commentsErrorObj,
    refetch: refetchComments,
  } = useGetComments({
    type: "courseAnnouncement",
    targetId: parseInt(announcementId),
  });
  const { mutate: createComment, isPending: isCreatingComment } = useCreateComment(
    parseInt(announcementId),
    "courseAnnouncement"
  );

  const pollResponses = usePollResponsesForAnnouncement(
    announcement?.is_poll && announcement?.poll?.poll_id ? announcement.poll.poll_id : null,
    currentUserId
  );

  if (!announcementId || isLoading || commentsLoading) {
    return (
      <PageContainers>
        <BackHeader title="Loading..." />
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <ThemedText variant="h3">Course Announcement</ThemedText>
        </View>
        <FullPageSpinner />
      </PageContainers>
    );
  }

  if (isError || commentsError || !announcement) {
    return (
      <PageContainers>
        <BackHeader title="Error" />
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <ThemedText variant="h3">Course Announcement</ThemedText>
        </View>
        <View style={[styles.errorContainer, { backgroundColor: colors.backgroundMain }]}>
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Error: {error?.message || commentsErrorObj?.message || "Failed to load announcement or comments"}
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

  const voteCounts = announcement.is_poll && announcement.poll?.options
    ? announcement.poll.options.reduce((acc, option) => {
        acc[option.option_id] = pollResponses.data.filter((r: PollResponse) => r.poll_option_id === option.option_id).length || 0;
        return acc;
      }, {} as { [key: number]: number })
    : {};

  const totalVotes = announcement.is_poll && announcement.poll?.options
    ? announcement.poll.options.reduce((sum, option) => sum + (voteCounts[option.option_id] || 0), 0)
    : 0;

  const handleCommentSubmit = (content: string) => {
    createComment({
      type: "courseAnnouncement",
      targetId: parseInt(announcementId),
      content,
    });
  };

  return (
    <PageContainers>
      <BackHeader title={announcement.title} />
      <ScrollView style={{ paddingVertical: 16 }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.neutralBorder,
            marginBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          {announcement.is_poll && announcement.poll?.poll_id && Array.isArray(announcement.poll.options) && announcement.poll.options.length > 0 ? (
            <PollAnnouncement
              id={announcement.announcement_id.toString()}
              title={announcement.title}
              content={announcement.content}
              date={announcement.created_at}
              comments={announcement._count.comments}
              author={{ name: announcement.teacher.user.name, image: announcement.teacher.user.image || "@/assets/images/valerie.jpg" }}
              options={announcement.poll.options.map((opt) => ({
                text: opt.content || "No option text",
                votes: voteCounts[opt.option_id] || 0,
                optionId: opt.option_id,
              }))}
              totalVotes={totalVotes}
              allowMultipleAnswers={announcement.poll.allow_multiple || false}
              index={0}
              announcementType="course"
              pollId={announcement.poll.poll_id}
              announcementId={announcement.announcement_id}
              userId={currentUserId}
              hasVoted={pollResponses.hasVoted}
            />
          ) : (
            <View style={styles.container}>
              <View style={styles.header}>
                <Image
                  source={
                    announcement.teacher.user.image
                      ? { uri: announcement.teacher.user.image }
                      : require("@/assets/images/valerie.jpg")
                  }
                  style={{
                    ...styles.badge,
                    backgroundColor: colors.backgroundNeutral,
                  }}
                />
                <View>
                  <ThemedText variant="h4">
                    {announcement.teacher.user.name}
                  </ThemedText>
                  <ThemedText variant="small">
                    {getTimeAgo(announcement.created_at)}
                  </ThemedText>
                </View>
              </View>
              <View style={{ marginBottom: 16 }}>
                <ThemedText
                  variant="h2"
                  style={{
                    marginBottom: 8,
                    color: colors.neutralTextPrimary,
                  }}
                >
                  {announcement.title}
                </ThemedText>
                <ThemedText variant="body">
                  {announcement.content || "No details provided."}
                </ThemedText>
                {announcement.attachments?.length > 0 && (
                  <View>
                    <ThemedText
                      variant="small"
                      style={{
                        color: colors.neutralTextSecondary,
                        marginTop: 8,
                        marginBottom: 8,
                      }}
                    >
                      {announcement.attachments.length} attachment
                      {announcement.attachments.length > 1 ? "s" : ""}
                    </ThemedText>
                    <FlatList
                      data={announcement.attachments}
                      renderItem={({ item }) => <FileCard file={{
                        url: item.url,
                        file_type: item.file_type,
                        size: undefined,
                        pages: undefined,
                        created_at: item.created_at,
                      }} />}
                      keyExtractor={(item, index) => `${announcement.announcement_id}-${index}`}
                      scrollEnabled={false}
                    />
                  </View>
                )}
                <ThemedText
                  variant="small"
                  style={{
                    color: colors.neutralTextTertiary,
                    marginVertical: 16,
                    textAlign: "right",
                  }}
                >
                  {announcement._count.comments || 0} comments
                </ThemedText>
              </View>
            </View>
          )}
        </View>
        <CommentList
          comments={comments || []}
          isLoading={commentsLoading}
          isError={commentsError}
          error={commentsErrorObj}
          refetch={refetchComments}
        />
      </ScrollView>
      <CommentInput
        type_id={announcement.announcement_id.toString()}
        type="courseAnnouncement"
        onSubmit={handleCommentSubmit}
        isLoading={isCreatingComment}
      />
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    width: "50%",
  },
});

export default CourseAnnouncement;