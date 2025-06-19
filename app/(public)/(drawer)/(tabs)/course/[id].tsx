import Button from '@/components/commons/buttons/Button';
import FloatingAddItemBtn from '@/components/commons/buttons/FloatingAddItemBtn';
import PageContainers from '@/components/commons/containers/PageContainer';
import { FullPageSpinner } from '@/components/commons/loaders/spinners';
import { BackHeader } from '@/components/commons/navigation/BackHeader';
import ThemedText from '@/components/commons/typography/ThemedText';
import AddOptionsModal from '@/components/screens/course-details/AddOptionsModal';
import Announcements from '@/components/screens/course-details/Announcements';
import Assignments from '@/components/screens/course-details/Assignment';
import Content from '@/components/screens/course-details/Content';
import People from '@/components/screens/course-details/People';
import { COLORS } from '@/constants/colors';
import { useGetCourseDetails } from '@/hooks/api/courses';
import { useTheme } from '@/hooks/useThemeColor';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const tabs = ['Announcements', 'Content', 'Assignments', 'People'];

const CourseDetails: React.FC = () => {
  const { id } = useLocalSearchParams();
  const courseId = parseInt(id as string);
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === 'light' ? COLORS.light : COLORS.dark;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('Announcements');

  const { data: course, isLoading, isError, error, refetch } = useGetCourseDetails(courseId);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError || !course) {
    return (
      <PageContainers>
        <BackHeader title="Course Details" />
        <View style={[styles.errorContainer, { backgroundColor: colors.backgroundMain }]}>
          <ThemedText style={[styles.errorText, { color: colors.error }]}>
            Error: {error?.message || 'Failed to load course details'}
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
      <BackHeader title={course.courseCode} />
      <ScrollView>
        <Image
          style={{
            backgroundColor: colors.backgroundNeutral,
            height: 150,
            width: '100%',
          }}
        />
        <View style={{ paddingHorizontal: 20, paddingVertical: 20, gap: 16 }}>
          <ThemedText variant="h3" style={{ color: colors.neutralTextPrimary }}>
            {course.courseCode + ': ' + course.title}
          </ThemedText>
          {course.description && <ThemedText>{course.description}</ThemedText>}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <ThemedText variant="caption">Created at: {formatDate(course.created_at)}</ThemedText>
            <ThemedText variant="caption">{course.student_count} Students</ThemedText>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: colors.neutralBorder,
          }}
          style={{
            flexDirection: 'row',
            gap: 10,
            flexGrow: 0,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabItem,
                activeTab === tab && {
                  borderBottomColor: colors.primaryBase,
                  borderBottomWidth: 2,
                },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <ThemedText
                style={{
                  color: activeTab === tab ? colors.neutralTextPrimary : colors.neutralTextTertiary,
                }}
              >
                {tab}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ paddingTop: 30 }}>
          {activeTab === 'Announcements' && <Announcements courseId={courseId.toString()} />}
          {activeTab === 'Content' && <Content />}
          {activeTab === 'Assignments' && <Assignments />}
          {activeTab === 'People' && <People />}
        </View>
      </ScrollView>
      <FloatingAddItemBtn onPress={() => setModalVisible(true)} />
      <AddOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        courseId={id?.toString()}
      />
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginRight: 8,
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

export default CourseDetails;