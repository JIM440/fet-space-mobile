import Button from "@/components/commons/buttons/Button";
import PollAnnouncement from "@/components/commons/cards/announcements/PollAnnouncement";
import FileCard from "@/components/commons/cards/FileCard";
import CommentInput from "@/components/commons/comments/CommentInputRow";
import CommentList from "@/components/commons/comments/CommentsList";
import PageContainers from "@/components/commons/containers/PageContainer";
import { FullPageSpinner } from "@/components/commons/loaders/spinners";
import { BackHeader } from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import {
  useAnnouncementSocket,
  useGeneralGetAnnouncementDetails,
  useGetPollResponses,
} from "@/hooks/api/announcements";
import { useCreateComment, useGetComments } from "@/hooks/api/comments";
import { useTheme } from "@/hooks/useThemeColor";
import { getTimeAgo } from "@/utils/dateFormatter";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
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

interface fileProps {
  name: string;
  size: string;
  pages?: number;
  type: "pdf" | "docx" | "img" | "ppt" | "video";
  url: string;
}

const GeneralAnnouncement = () => {
  useAnnouncementSocket();
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const { id } = useLocalSearchParams();
  const announcementId = Number(id);
  const {
    data: announcement,
    isLoading,
    isError,
    error,
    refetch,
  } = useGeneralGetAnnouncementDetails(announcementId);
  const currentUserId = 1; // Replace with auth context;

  // Fetch poll responses if the announcement is a poll
  const pollResponseQuery =
    announcement?.is_poll && announcement.poll?.poll_id
      ? useGetPollResponses({ pollId: announcement.poll.poll_id })
      : null;
  const pollResponses = useMemo(() => {
    return pollResponseQuery?.data || [];
  }, [pollResponseQuery?.data]);

  // Fetch comments
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
    error: commentsErrorObj,
    refetch: refetchComments,
  } = useGetComments({
    type: "generalAnnouncement",
    targetId: announcementId,
  });

  console.log(comments);

  // Handle comment creation
  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateComment(announcementId, "generalAnnouncement");

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  if (!announcementId || isLoading || commentsLoading) {
    return (
      <PageContainers>
        <BackHeader title="" />
        <FullPageSpinner />
      </PageContainers>
    );
  }

  if (isError || commentsError) {
    return (
      <PageContainers>
        <BackHeader title="" />
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: colors.backgroundMain },
          ]}
        >
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Error:{" "}
            {error?.message ||
              commentsErrorObj?.message ||
              "Failed to load announcement or comments"}
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
    name: announcement?.admin?.user.name || "Unknown",
    image: announcement?.admin?.user.image || "",
  };

  const voteCounts =
    announcement?.is_poll && announcement.poll?.options
      ? announcement.poll.options.reduce((acc, option) => {
          acc[option.option_id] =
            pollResponses.filter((r) => r.poll_option_id === option.option_id)
              .length || 0;
          return acc;
        }, {} as { [key: number]: number })
      : {};

  const totalVotes =
    announcement?.is_poll && announcement.poll?.options
      ? announcement.poll.options.reduce(
          (sum, option) => sum + (voteCounts[option.option_id] || 0),
          0
        )
      : 0;

  const handleCommentSubmit = (content: string) => {
    createComment({
      type: "generalAnnouncement",
      targetId: announcementId,
      content,
    });
  };

  return (
    <PageContainers>
      <BackHeader title="" />
      {announcement && (
        <ScrollView style={{ paddingVertical: 16 }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.neutralBorder,
              marginBottom: 20,
              paddingHorizontal: 20,
            }}
          >
            {announcement.is_poll &&
            announcement.poll?.poll_id &&
            Array.isArray(announcement.poll.options) &&
            announcement.poll.options.length > 0 ? (
              <PollAnnouncement
                id={announcement.announcement_id.toString()}
                title={announcement.title}
                content={announcement.content}
                date={announcement.created_at}
                comments={announcement._count?.comments || 0}
                author={author}
                options={announcement.poll.options.map((opt) => ({
                  text: opt.content || "No option text",
                  votes: voteCounts[opt.option_id] || 0,
                  optionId: opt.option_id,
                }))}
                totalVotes={totalVotes}
                allowMultipleAnswers={
                  announcement.poll.allow_multiple_answers || false
                }
                index={0}
                announcementType="general"
                pollId={announcement.poll.poll_id}
                announcementId={announcement.announcement_id}
                userId={currentUserId}
                hasVoted={pollResponses.some(
                  (r) => r.user_id === currentUserId
                )}
              />
            ) : (
              <View style={styles.container}>
                <View style={styles.header}>
                  <Image
                    source={
                      author.image
                        ? { uri: author.image }
                        : require("@/assets/images/valerie.jpg")
                    }
                    style={{
                      ...styles.badge,
                      backgroundColor: colors.backgroundNeutral,
                    }}
                  />
                  <View>
                    <ThemedText variant="h4">{author.name}</ThemedText>
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
                        renderItem={({ item }) => <FileCard file={item} />}
                        keyExtractor={(item) => item.name}
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
                    {announcement._count?.comments || 0} comments
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
      )}
      <CommentInput
        type_id={announcementId.toString()}
        type="generalAnnouncement"
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

export default GeneralAnnouncement;
