import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { departments } from "@/constants/static-data/departments";
import { useTheme } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type DepartmentKeys =
  | "mechanical"
  | "electrical"
  | "computer"
  | "civil"
  | "petroleum";

const administration = [
  {
    name: "Prof. Agbor Dieudonne Agbor",
    role: "Dean",
    imageUri: require("@/assets/images/admins/dean.jpg"),
  },
  {
    name: "Dr. Nde Nguti",
    role: "Vice Dean",
    imageUri: require("@/assets/images/admins/nguti.jpg"),
  },
  {
    name: "Dr. Nkemeni Valerie",
    role: "HOD of Electrical Department",
    imageUri: require("@/assets/images/admins/valerie.jpg"),
  },
  {
    name: "Prof. Elie Fute",
    role: "HOD of Computer Department",
    imageUri: require("@/assets/images/admins/fute.jpg"),
  },
  {
    name: "Dr. Sop Leonel",
    role: "Coordinator of Computer Engineering",
    imageUri: require("@/assets/images/admins/sop.jpg"),
  },
  {
    name: "Dr. Fozin",
    role: "Lecturer",
    imageUri: require("@/assets/images/admins/fozin.jpg"),
  },
];

const AboutFET = () => {
  const { width, height } = Dimensions.get("screen");
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const [expandedDepartments, setExpandedDepartments] = useState<
    Record<DepartmentKeys, boolean>
  >({
    mechanical: false,
    electrical: false,
    computer: false,
    civil: false,
    petroleum: false,
  });

  const toggleDepartment = (department: DepartmentKeys) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [department]: !prev[department],
    }));
  };

  return (
    <PageContainers>
      <BackHeader title="About FET" />
      <ScrollView style={{ width: "100%" }}>
        <Image
          source={{
            uri: "https://www.camexamen.com/wp-content/uploads/2018/08/Fet-picture.jpg",
          }} // Replace with actual FET image URI or asset
          style={{
            width: width,
            height: 220,
            resizeMode: "cover",
            backgroundColor: colors.backgroundNeutral,
          }}
        />
        <View style={styles.contentContainer}>
          <ThemedText
            variant="h2"
            style={{ marginBottom: 16, color: colors.neutralTextPrimary }}
          >
            Faculty of Engineering and Technology
          </ThemedText>

          <ThemedText
            variant="h3"
            style={[
              styles.sectionTitle,
              {
                color: colors.neutralTextPrimary,
                borderBottomColor: colors.neutralBorder,
              },
            ]}
          >
            History
          </ThemedText>
          <ThemedText style={{ marginBottom: 16 }}>
            The Faculty of Engineering and Technology is one of the
            establishments of the University of Buea. Created in 1993 with the
            creation of the University, it opened its doors to the first
            students in 2010, featuring four degree programs: Bachelor of
            Science in Engineering in Power Systems, Telecommunications Systems,
            Software Engineering and Network and Security. Currently, the
            Faculty has five departments with over each featuring at least one
            degree program. Postgraduate programs have enabled the Faculty to
            train more of its manpower.
          </ThemedText>

          <ThemedText
            variant="h3"
            style={[
              styles.sectionTitle,
              {
                color: colors.neutralTextPrimary,
                borderBottomColor: colors.neutralBorder,
              },
            ]}
          >
            Mission
          </ThemedText>
          <ThemedText style={{ marginBottom: 16 }}>
            In fulfilment of its vision, the Faculty of Engineering and
            Technology trains a diverse pool of students to become future
            engineers and engineering leaders, capable of sustainable
            self-employment. Integrate quality Assessment in teaching /research
            programmes Seek collaboration with international and national
            leaders in engineering training Vigorously impact the
            entrepreneurial spirit in our students
          </ThemedText>

          <ThemedText
            variant="h3"
            style={[
              styles.sectionTitle,
              {
                color: colors.neutralTextPrimary,
                borderBottomColor: colors.neutralBorder,
              },
            ]}
          >
            Vision
          </ThemedText>
          <ThemedText style={{ marginBottom: 16 }}>
            The Faculty of Engineering and Technology (FET) will be an impactful
            institution that excels in knowledge creation, propagation and
            application across a spectrum of engineering disciplines using
            traditional and leading-edge teaching technologies and methods,
            whose graduates will respond to the national and sub-regional
            development needs and competing successfully in the global job
            market.
          </ThemedText>

          <ThemedText
            variant="h3"
            style={[
              styles.sectionTitle,
              {
                color: colors.neutralTextPrimary,
                borderBottomColor: colors.neutralBorder,
              },
            ]}
          >
            Departments
          </ThemedText>
          {departments.map((dept) => (
            <View key={dept.key} style={styles.departmentContainer}>
              <TouchableOpacity
                style={styles.departmentHeader}
                onPress={() => toggleDepartment(dept.key as DepartmentKeys)}
              >
                <ThemedText variant="h4">{dept.name}</ThemedText>
                <Feather
                  name={
                    expandedDepartments[dept.key as DepartmentKeys]
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={20}
                  color={colors.neutralTextSecondary}
                />
              </TouchableOpacity>
              {expandedDepartments[dept.key as DepartmentKeys] && (
                <ThemedText style={{ marginBottom: 16 }}>
                  {dept.description}
                </ThemedText>
              )}
            </View>
          ))}

          <ThemedText
            variant="h3"
            style={[
              styles.sectionTitle,
              {
                color: colors.neutralTextPrimary,
                borderBottomColor: colors.neutralBorder,
              },
            ]}
          >
            Administration
          </ThemedText>
          <View style={styles.adminContainer}>
            {administration.map((admin, index) => (
              <View key={index} style={styles.adminCard}>
                {/* {console.log(admin.imageUri)} */}
                <Image
                  source={admin.imageUri}
                  style={{
                    ...styles.adminImage,
                    backgroundColor: colors.backgroundNeutral,
                  }}
                />
                <ThemedText
                  variant="h4"
                  style={{ marginTop: 8, textAlign: "center" }}
                >
                  {admin.name}
                </ThemedText>
                <ThemedText
                  style={{
                    color: colors.neutralTextSecondary,
                    textAlign: "center",
                  }}
                >
                  {admin.role}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  departmentContainer: {
    marginBottom: 16,
  },
  departmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  adminContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  adminCard: {
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  adminImage: {
    width: "100%",
    height: 200,
    borderRadius: 6,
  },
});

export default AboutFET;
