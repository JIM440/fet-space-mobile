import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { administration } from "@/constants/static-data/admins";
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
          source={{ uri: "https://via.placeholder.com/400x200" }} // Replace with actual FET image URI or asset
          style={{
            width: width,
            height: 200,
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
            Founded in 1970, the Pioneer Institute of Engineering has grown from
            a small technical college into a globally recognized leader in
            engineering education. In 1985, we launched the nation’s first
            undergraduate program in Renewable Energy Engineering. Our alumni
            include Dr. Maria Chen, who developed the world’s first scalable
            solar microgrid, and in 2023, we earned ABET accreditation for all
            programs. Today, we rank #12 in national engineering schools by
            [Fictional Ranking Source].
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
            At the Pioneer Institute of Engineering, our mission is to empower
            future engineers with the knowledge, skills, and creativity to
            tackle global challenges. Through rigorous education, hands-on
            innovation, and a commitment to diversity, we prepare students to
            lead in a rapidly evolving technological world.
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
            At the Pioneer Institute of Engineering, our mission is to empower
            future engineers with the knowledge, skills, and creativity to
            tackle global challenges. Through rigorous education, hands-on
            innovation, and a commitment to diversity, we prepare students to
            lead in a rapidly evolving technological world.
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
                <Image
                  source={{ uri: admin.imageUri }}
                  style={{
                    ...styles.adminImage,
                    backgroundColor: colors.backgroundNeutral,
                  }}
                />
                <ThemedText style={{ marginTop: 8 }}>{admin.name}</ThemedText>
                <ThemedText style={{ color: colors.neutralTextSecondary }}>
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
    height: 150,
    borderRadius: 6,
  },
});

export default AboutFET;
