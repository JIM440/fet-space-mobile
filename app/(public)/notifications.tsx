import Button from "@/components/commons/buttons/Button";
import PageContainers from "@/components/commons/containers/PageContainer";
import { FullPageSpinner } from "@/components/commons/loaders/spinners";
import { BackHeader } from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import NotificationsItem from "@/components/screens/notifications/NotificationsItem";
import { COLORS } from "@/constants/colors";
import { AuthContext } from "@/context/AuthContext";
import { useGetNotifications } from "@/hooks/api/notifications";
import { useTheme } from "@/hooks/useThemeColor";
import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const Notifications = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const { user } = useContext(AuthContext);
  const { notifications, isLoading, isError, error, refetch } =
    useGetNotifications();

  if (!user) {
    return (
      <PageContainers>
        <BackHeader title="Notifications" />
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: colors.backgroundMain },
          ]}
        >
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Please log in to view notifications.
          </ThemedText>
        </View>
      </PageContainers>
    );
  }

  if (isLoading) {
    return <PageContainers>
      <BackHeader title="Notifications" />
      <FullPageSpinner />
    </PageContainers>;
  }

  if (isError || !notifications) {
    return (
      <PageContainers>
        <BackHeader title="Notifications" />
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: colors.backgroundMain },
          ]}
        >
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Error: {error?.message || "Failed to load notifications"}
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

  return (
    <PageContainers>
      <BackHeader title="Notifications" />
      <View>
        <FlatList
          data={notifications}
          renderItem={({ item, index }) => (
            <NotificationsItem notification={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <ThemedText
              style={{
                color: colors.neutralTextSecondary,
                paddingHorizontal: 20,
              }}
            >
              No notifications.
            </ThemedText>
          }
        />
      </View>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
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

export default Notifications;
