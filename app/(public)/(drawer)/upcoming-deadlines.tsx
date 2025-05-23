import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface Assignment {
  id: number;
  title: string;
  courseCode: string;
  dueDate: string;
  description: string;
  imageUri: string;
}

const mockAssignments: Assignment[] = [
  {
    id: 1,
    title: "Final Project Proposal",
    courseCode: "CEF 350",
    dueDate: "May 25, 2025, 11:59 PM",
    description:
      "Submit a detailed proposal for your final project, including methodology and timeline.",
    imageUri: "https://via.placeholder.com/80", // Replace with actual image URI
  },
  {
    id: 2,
    title: "Midterm Assignment",
    courseCode: "MEC 410",
    dueDate: "May 27, 2025, 11:59 PM",
    description:
      "Complete the design analysis for the robotics module and submit your report.",
    imageUri: "https://via.placeholder.com/80", // Replace with actual image URI
  },
  {
    id: 3,
    title: "Lab Report 3",
    courseCode: "ELE 320",
    dueDate: "May 30, 2025, 11:59 PM",
    description:
      "Analyze the circuit data from Lab 3 and submit your findings.",
    imageUri: "https://via.placeholder.com/80", // Replace with actual image URI
  },
];

const UpcomingDeadlines = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  return (
    <PageContainers>
      <BackHeader title="Upcoming Deadlines" />
      <ScrollView style={{ width: "100%", paddingBottom: 16 }}>
        {mockAssignments.length > 0 ? (
          mockAssignments.map((assignment) => (
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
                  Due: {assignment.dueDate}
                </ThemedText>
              </View>
            </View>
          ))
        ) : (
          <ThemedText style={{ color: colors.neutralTextSecondary }}>
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
});

export default UpcomingDeadlines;
