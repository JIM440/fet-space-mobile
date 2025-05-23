import FloatingAddItemBtn from "@/components/commons/buttons/FloatingAddItemBtn";
import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import AddOptionsModal from "@/components/screens/course-details/AddOptionsModal";
import Announcements from "@/components/screens/course-details/Announcements";
import Assignments from "@/components/screens/course-details/Assignment";
import Content from "@/components/screens/course-details/Content";
import People from "@/components/screens/course-details/People";
import { COLORS } from "@/constants/colors";
import { courses } from "@/constants/static-data/courses";
import { useTheme } from "@/hooks/useThemeColor";
import { courseProps } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const tabs = ["Announcements", "Content", "Assignments", "People"];
const CourseDetails = () => {
  const { id } = useLocalSearchParams();
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const [course, setCourse] = useState<courseProps | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Announcements");

  useEffect(() => {
    if (id) {
      setCourse(
        courses.find((course) => course.id === parseInt(id.toString()))
      );
    }
  }, [id]);

  if (!course) {
    return <ThemedText>Loading...</ThemedText>;
  }

  return (
    <PageContainers>
      <BackHeader title={course.courseCode} />
      <ScrollView>
        <Image
          style={{
            backgroundColor: colors.backgroundNeutral,
            height: 150,
            width: "100%",
          }}
        />
        <View style={{ paddingHorizontal: 20, paddingVertical: 20, gap: 16 }}>
          <ThemedText variant="h3" style={{ color: colors.neutralTextPrimary }}>
            {course.courseCode + " " + course.title}
          </ThemedText>
          {course.description && <ThemedText>{course.description}</ThemedText>}
          <ThemedText>Created at: 12/12/2023</ThemedText>
        </View>
        {/* Tab Bar */}
        <ScrollView
          contentContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: colors.neutralBorder,
          }}
          style={{
            display: "flex",
            flexDirection: "row",
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
                style={[
                  {
                    color:
                      activeTab === tab
                        ? colors.neutralTextPrimary
                        : colors.neutralTextTertiary,
                  },
                ]}
              >
                {tab}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Tab Content Placeholder */}
        <View style={{ paddingTop: 30 }}>
          {activeTab === "Announcements" && <Announcements />}
          {activeTab === "Content" && <Content />}
          {activeTab === "Assignments" && <Assignments />}
          {activeTab === "People" && <People />}
        </View>
      </ScrollView>
      {/* floating icon */}
      <FloatingAddItemBtn onPress={() => setModalVisible(true)} />
      {/* add items modal options */}
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
    alignItems: "center",
    marginRight: 8,
  },
});

export default CourseDetails;
