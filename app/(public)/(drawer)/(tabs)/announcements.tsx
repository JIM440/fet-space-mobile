import Button from "@/components/commons/buttons/Button";
import renderAnnouncements from "@/components/commons/cards/announcements/renderAnnouncements";
import PageContainers from "@/components/commons/containers/PageContainer";
import { FullPageSpinner } from "@/components/commons/loaders/spinners";
import TabHeader from "@/components/commons/navigation/TabHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import api from "@/constants/appBaseUrl";
import { COLORS } from "@/constants/colors";
import { useAnnouncementSocket, useGetGeneralAnnouncements } from "@/hooks/api/announcements";
import { useTheme } from "@/hooks/useThemeColor";
import { useQueries } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import InfiniteScrollView from "react-native-infinite-scroll-view";

interface PollResponse {
  user_id: number;
  poll_option_id: number;
  created_at: string;
}

// Custom hook to fetch poll responses for multiple poll IDs
const usePollResponsesForAnnouncements = (pollIds: number[]) => {
  const queries = useQueries({
    queries: pollIds.map((pollId) => ({
      queryKey: ['pollResponses', pollId],
      queryFn: () => api.get(`/polls/${pollId}/responses`).then((res) => res.data),
      enabled: !!pollId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    })),
  });

  const pollResponses = useMemo(() => {
    return queries.reduce((acc, query, index) => {
      if (query.data) acc[pollIds[index]] = query.data;
      return acc;
    }, {} as { [key: number]: PollResponse[] });
  }, [queries, pollIds]);

  return pollResponses;
};

const AnnouncementsScreen: React.FC = () => {
  useAnnouncementSocket();
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetGeneralAnnouncements();
  const currentUserId = 1; // Replace with auth context

  const announcements = data?.pages.flat() || [];
  const pollIds = useMemo(() =>
    announcements?.filter((a) => a.is_poll && a.poll?.poll_id).map((a) => a.poll.poll_id) || [],
    [announcements]
  );

  // Use the custom hook to fetch poll responses
  const pollResponses = usePollResponsesForAnnouncements(pollIds);

  const loadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <PageContainers>
        <TabHeader />
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <ThemedText variant="h3">Announcements</ThemedText>
        </View>
        <FullPageSpinner />
      </PageContainers>
    );
  }

  if (isError) {
    return (
      <PageContainers>
        <TabHeader />
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <ThemedText variant="h3">Announcements</ThemedText>
        </View>
        <View style={[styles.errorContainer, { backgroundColor: colors.backgroundMain }]}>
          <ThemedText style={[styles.errorText]}>
            Error: {error?.message || "Failed to load announcements"}
          </ThemedText>
          <Button
            title="Retry"
            onPress={() => refetch()}
            style={styles.retryButton}
          />
        </View>
      </PageContainers>
    );
  }

  return (
    <PageContainers>
      <TabHeader />
      <InfiniteScrollView
        canLoadMore={hasNextPage}
        isLoading={isFetchingNextPage}
        onLoadMoreAsync={loadMore}
      >
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <ThemedText variant="h3">Announcements</ThemedText>
        </View>
        <View style={{ gap: 20, backgroundColor: colors.backgroundSecondary }}>
          {!announcements.length ? (
            <ThemedText style={{ color: colors.neutralTextSecondary, padding: 20 }}>
              No announcements sent out yet.
            </ThemedText>
          ) : (
            announcements.map((item, index) =>
              renderAnnouncements(item, index, { userId: currentUserId, pollResponses })
            )
          )}
        </View>
      </InfiniteScrollView>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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

export default AnnouncementsScreen;