import FloatingAddCourseBtn from "@/components/commons/buttons/FloatingAddCourseBtn";
import CourseCard from "@/components/commons/cards/CourseCard";
import PageContainers from "@/components/commons/containers/PageContainer";
import TabHeader from "@/components/commons/navigation/TabHeader";
import AddCourseModal from "@/components/screens/courses/AddCourseModal";
import { COLORS } from "@/constants/colors";
import { courses } from "@/constants/static-data/courses";
import { useTheme } from "@/hooks/useThemeColor";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

function Courses() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("all");
  const [items, setItems] = useState([
    { label: "All Courses", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "In Progress", value: "in_progress" },
    { label: "Not Started", value: "not_started" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <PageContainers>
      <ScrollView stickyHeaderHiddenOnScroll={true} stickyHeaderIndices={[1]}>
        {/* tab header */}
        <TabHeader />
        {/* filter */}
        <View
          style={{
            paddingHorizontal: 8,
            backgroundColor: colors.backgroundMain,
          }}
        >
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
              borderColor: "transparent",
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
        {/* courses cards */}
        <View style={{ paddingHorizontal: 20 }}>
          {courses.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </View>
      </ScrollView>
      {/* add course button */}
      <FloatingAddCourseBtn onPress={() => setModalVisible(true)} />
      {/* add course modal */}
      <AddCourseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </PageContainers>
  );
}

export default Courses;
