import Button from '@/components/commons/buttons/Button';
import FloatingAddCourseBtn from '@/components/commons/buttons/FloatingAddCourseBtn';
import CourseCard from '@/components/commons/cards/CourseCard';
import PageContainers from '@/components/commons/containers/PageContainer';
import { FullPageSpinner } from '@/components/commons/loaders/spinners';
import TabHeader from '@/components/commons/navigation/TabHeader';
import ThemedText from '@/components/commons/typography/ThemedText';
import AddCourseModal from '@/components/screens/courses/AddCourseModal';
import JoinCourseModal from '@/components/screens/courses/JoinCourse';
import { COLORS } from '@/constants/colors';
import { useGetStudentCourses } from '@/hooks/api/student';
import { useGetTeacherCourses } from '@/hooks/api/teacher';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useThemeColor';
import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface DropDownItem {
  label: string;
  value: string;
}

const Courses: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === 'light' ? COLORS.light : COLORS.dark;
  const { role } = useAuth();

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('all');
  const [items, setItems] = useState<DropDownItem[]>([
    { label: 'All Courses', value: 'all' },
    { label: 'Level 200', value: 'level 200' },
    { label: 'Level 300', value: 'level 300' },
    { label: 'Level 400', value: 'level 400' },
    { label: 'Level 500', value: 'level 500' },
  ]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const studentCoursesQuery = useGetStudentCourses(role);
  const teacherCoursesQuery = useGetTeacherCourses(role);

  const { data: courses, isLoading, isError, error, refetch } =
    role === 'Teacher' ? teacherCoursesQuery : studentCoursesQuery;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Client-side filtering (API doesn't support status filtering)
  const filteredCourses = courses?.filter((course) => {
    if (value === 'all') return true;
    // Placeholder: Adjust filtering logic when API supports status
    return true; // Replace with actual status checks if available
  });

  if (isLoading) {
    return (
      <PageContainers>
        <TabHeader />
        <FullPageSpinner />
      </PageContainers>
    );
  }

  if (isError) {
    return (
      <PageContainers>
        <TabHeader />
        <View style={[styles.errorContainer, { backgroundColor: colors.backgroundMain }]}>
          <ThemedText style={[styles.errorText ]}>
            Error: {error?.message || 'Failed to load courses'}
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
        <>
          {/* Courses header */}
          <ScrollView stickyHeaderHiddenOnScroll={true} stickyHeaderIndices={[1]}>
            <TabHeader />
            <View style={{ paddingHorizontal: 8, backgroundColor: colors.backgroundMain }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select Course Filter"
                style={{
                  backgroundColor: colors.backgroundMain,
                  borderColor: 'transparent',
                  width: 150,
                }}
                dropDownContainerStyle={{
                  backgroundColor: colors.backgroundMain,
                  borderColor: colors.neutralBorder,
                }}
                textStyle={{
                  color: colors.neutralTextSecondary,
                }}
                ArrowDownIconComponent={({ style }) => (
                  <Entypo
                    name="chevron-down"
                    size={20}
                    color={colors.neutralTextSecondary}
                  />
                )}
                ArrowUpIconComponent={({ style }) => (
                  <Entypo
                    name="chevron-up"
                    size={20}
                    color={colors.neutralTextSecondary}
                  />
                )}
                flatListProps={{ scrollEnabled: false }}
              />
            </View>
            {/* Courses cards */}
            <View style={{ paddingHorizontal: 20 }}>
              {filteredCourses && filteredCourses?.length === 0 ? (
                <ThemedText
                  style={{ textAlign: 'center', color: colors.neutralTextSecondary, paddingTop: 20 }}
                >
                  Tap the + button below to {role === 'Teacher' ? 'add' : 'join'} your first course.
                </ThemedText>
              ) : (
                filteredCourses?.map((course, index) => (
                  <CourseCard
                    key={index}
                    course={course}
                  />
                ))
              )}
            </View>
          </ScrollView>
          <FloatingAddCourseBtn onPress={toggleModal} />
          {role === 'Teacher' ? (
            <AddCourseModal visible={modalVisible} onClose={toggleModal} />
          ) : (
            <JoinCourseModal visible={modalVisible} onClose={toggleModal} />
          )}
        </>
    </PageContainers>
  );
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

export default Courses;