import Button from "@/components/commons/buttons/Button";
import PageContainers from "@/components/commons/containers/PageContainer";
import { FullPageSpinner } from "@/components/commons/loaders/spinners";
import { BackHeader } from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { AuthContext } from "@/context/AuthContext";
import { useGetDeadlines } from "@/hooks/api/student";
import { useTheme } from "@/hooks/useThemeColor";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const UpcomingDeadlines = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const { user } = useContext(AuthContext);
  const { deadlines, isLoading, isError, error, refetch } = useGetDeadlines();

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
    return <FullPageSpinner />;
  }

  if (isError || !deadlines) {
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
        {deadlines.length > 0 ? (
          deadlines.map((assignment) => (
            <View
              key={assignment.id}
              style={{
                ...styles.assignmentCard,
                borderBottomColor: colors.backgroundNeutral,
              }}
            >
              <View style={styles.content}>
                <ThemedText
                  variant="h4"
                  style={{ color: colors.neutralTextPrimary }}
                >
                  {assignment.title} - {assignment.courseCode}
                </ThemedText>
                <ThemedText
                  variant="caption"
                  style={{
                    color: colors.neutralTextSecondary,
                    marginTop: 4,
                  }}
                >
                  {assignment.description}
                </ThemedText>
                <ThemedText
                  variant="caption"
                  style={{
                    color: colors.neutralTextSecondary,
                    marginTop: 12,
                  }}
                >
                  Due: {new Date(assignment.dueDate).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </ThemedText>
              </View>
            </View>
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