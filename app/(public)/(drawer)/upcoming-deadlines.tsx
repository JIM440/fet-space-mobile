import Button from "@/components/commons/buttons/Button";
import PageContainers from "@/components/commons/containers/PageContainer";
import { FullPageSpinner } from "@/components/commons/loaders/spinners";
import { BackHeader } from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useGetDeadlines } from "@/hooks/api/student";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const UpcomingDeadlines = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const { user } = useAuth();
  const { data: deadlines, isLoading, isError, error, refetch } = useGetDeadlines(user?.userId);

  if (!user || user.role !== 'Student') {
    return (
      <PageContainers>
        <BackHeader title="Upcoming Deadlines" />
        <View style={[styles.errorContainer, { backgroundColor: colors.backgroundMain }]}>
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Access restricted to students only.
          </ThemedText>
        </View>
      </PageContainers>
    );
  }

  if (isLoading) {
    return (
    <PageContainers>
      <BackHeader title="Upcoming Deadlines" />
    <FullPageSpinner />
    </PageContainers>
    );
  }

  if (isError) {
    return (
      <PageContainers>
        <BackHeader title="Upcoming Deadlines" />
        <View style={[styles.errorContainer, { backgroundColor: colors.backgroundMain }]}>
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Error: {error?.message || 'Failed to load deadlines'}
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
      <BackHeader title="Upcoming Deadlines" />
      <ScrollView style={{ width: "100%", paddingBottom: 16 }}>
        {deadlines && deadlines.length > 0 ? (
          deadlines.map((assignment) => (
            <TouchableOpacity
              key={assignment.assignment_id}
              style={{
                ...styles.assignmentCard,
                borderBottomColor: colors.backgroundNeutral,
              }}
              onPress={() =>
                router.push(`/assignment/${assignment.assignment_id}`)
              }
            >
              <View style={styles.content}>
                <ThemedText
                  variant="h4"
                  style={{ color: colors.neutralTextPrimary }}
                >
                  {assignment.title} - {assignment.course_title}
                </ThemedText>
                {/* Note: The server response doesn't include description, so this is a placeholder */}
                <ThemedText
                  variant="caption"
                  style={{
                    color: colors.neutralTextSecondary,
                    marginTop: 4,
                  }}
                >
                  {assignment.description || 'No description available'}
                </ThemedText>
                <ThemedText
                  variant="caption"
                  style={{
                    color: colors.neutralTextSecondary,
                    marginTop: 12,
                  }}
                >
                  Due: {new Date(assignment.due_date).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <ThemedText style={{ color: colors.neutralTextSecondary, paddingHorizontal: 20 }}>
            No upcoming deadlines.
          </ThemedText>
        )}
      </ScrollView>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  assignmentCard: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
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

export default UpcomingDeadlines;