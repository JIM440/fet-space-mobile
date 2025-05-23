import PollAnnouncement from "@/components/commons/cards/announcements/PollAnouncement";
import FileCard from "@/components/commons/cards/FileCard";
import CommentInput from "@/components/commons/comments/CommentInputRow";
import CommentList from "@/components/commons/comments/CommentsList";
import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { mockComments } from "@/constants/static-data/comments";
import { useTheme } from "@/hooks/useThemeColor";
import { RegularAnnouncementProps, fileProps } from "@/types";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

interface AnnouncementsProps {
  context: {
    courseId: string | undefined;
    announcementId: string;
  };
}

const mockAnnouncement: (RegularAnnouncementProps | any) & {
  files?: fileProps[];
} = {
  id: "announcement-1",
  title: "Welcome to the Course",
  content:
    "This is the first announcement for the course. Please review the syllabus.",
  date: "2023-12-12",
  comments: 0,
  author: { name: "Prof. Smith", image: "@/assets/images/candace_owens.jpg" },
  announcementType: "course",
  // type: "regular",
  type: "poll", // Switch to "regular" to test regular announcement
  options: [
    { text: "Option 1", votes: 10 },
    { text: "Option 2", votes: 5 },
  ],
  totalVotes: 15,
  allowMultipleAnswers: false,
  index: 0,
  files: [
    { name: "Syllabus.pdf", type: "pdf", pages: 10, size: "1.2 MB" },
    { name: "Intro.ppt", type: "ppt", pages: 15, size: "2.5 MB" },
  ],
};

const CourseAnnouncement: React.FC<AnnouncementsProps> = ({ context }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  return (
    <PageContainers>
      <BackHeader title={mockAnnouncement.title} />
      <ScrollView style={{ paddingVertical: 16 }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.neutralBorder,
            marginBottom: 20,
          }}
        >
          {mockAnnouncement.type === "regular" ? (
            <View style={{ ...styles.container, paddingHorizontal: 20 }}>
              <View style={styles.header}>
                <Image
                  source={require("@/assets/images/candace_owens.jpg")}
                  style={{
                    ...styles.badge,
                    backgroundColor: colors.backgroundNeutral,
                  }}
                />
                <View>
                  <ThemedText variant="h4">
                    {mockAnnouncement.author.name}
                  </ThemedText>
                  <ThemedText variant="small">
                    {formatDate(mockAnnouncement.date)}
                  </ThemedText>
                </View>
              </View>
              <View style={{ marginBottom: 16 }}>
                <ThemedText
                  variant="h2"
                  style={{ marginBottom: 8, color: colors.neutralTextPrimary }}
                >
                  {mockAnnouncement.title}
                </ThemedText>
                <ThemedText variant="body">
                  {mockAnnouncement.content}
                </ThemedText>
                {mockAnnouncement.files &&
                  mockAnnouncement.files.length > 0 && (
                    <View style={{ marginTop: 16, gap: 8 }}>
                      {mockAnnouncement.files.map((file, index) => (
                        <FileCard key={index} file={file} />
                      ))}
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
                  {mockAnnouncement.comments || 0} comments
                </ThemedText>
              </View>
            </View>
          ) : (
            <PollAnnouncement
              id={mockAnnouncement.id}
              title={mockAnnouncement.title}
              content={mockAnnouncement.content}
              date={mockAnnouncement.date}
              comments={mockAnnouncement.comments}
              author={mockAnnouncement.author}
              options={mockAnnouncement.options!}
              totalVotes={mockAnnouncement.totalVotes!}
              allowMultipleAnswers={mockAnnouncement.allowMultipleAnswers!}
              index={mockAnnouncement.index}
              announcementType={mockAnnouncement.announcementType}
            />
          )}
        </View>
        <CommentList comments={mockComments} />
      </ScrollView>
      <CommentInput type_id={mockAnnouncement.id} type='announcement' />
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
});

export default CourseAnnouncement;
