import Button from '@/components/commons/buttons/Button';
import renderAnnouncements from '@/components/commons/cards/announcements/renderAnnouncements';
import PageContainers from '@/components/commons/containers/PageContainer';
import { FullPageSpinner } from '@/components/commons/loaders/spinners';
import TabHeader from '@/components/commons/navigation/TabHeader';
import ThemedText from '@/components/commons/typography/ThemedText';
import { COLORS } from '@/constants/colors';
import { useGetGeneralAnnouncements } from '@/hooks/api/announcements';
import { useTheme } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

const AnnouncementsScreen: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === 'light' ? COLORS.light : COLORS.dark;

  const { announcements, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } = useGetGeneralAnnouncements();

  const loadMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  if (isLoading && !announcements) {
    return <>
    <TabHeader />
    <FullPageSpinner />;
    </>
  }

  if (isError) {
    return (
      <PageContainers>
        <View style={[styles.errorContainer, { backgroundColor: colors.backgroundMain }]}>
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Error: {error?.message || 'Failed to load announcements'}
          </ThemedText>
          <Button
            title="Retry"
            variant="primary"
            onPress={() => refetch()}
            style={styles.retryButton}
          />
        </View>
      </PageContainers>
    );
  }

  if(!isLoading && !isError && announcements){return (
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
          {(!announcements[0]) || announcements.length === 0 ? (
            <ThemedText style={{ color: colors.neutralTextSecondary, padding: 20 }}>
              No announcements sent out yet.
            </ThemedText>
          ) : (
            announcements.map(renderAnnouncements)
          )}
        </View>
      </InfiniteScrollView>
    </PageContainers>
  );}
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

export default AnnouncementsScreen;