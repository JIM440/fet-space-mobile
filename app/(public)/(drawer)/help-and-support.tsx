import Button from "@/components/commons/buttons/Button";
import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface FAQ {
  question: string;
  answer: string;
  key: string;
}

type FAQKeys = "password" | "course" | "deadline" | "contact";

const HelpAndSupport = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const [expandedFAQs, setExpandedFAQs] = useState<Record<FAQKeys, boolean>>({
    password: false,
    course: false,
    deadline: false,
    contact: false,
  });

  const toggleFAQ = (key: FAQKeys) => {
    setExpandedFAQs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const faqs: FAQ[] = [
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login page and click 'Forgot Password.' Enter your registered email address, and you'll receive a link to reset your password.",
      key: "password",
    },
    {
      question: "How can I enroll in a course?",
      answer:
        "Navigate to the 'Courses' section, select the course you want to enroll in, and click the 'Enroll' button. If enrollment is closed, contact the course instructor or admin.",
      key: "course",
    },
    {
      question: "Where can I view upcoming deadlines?",
      answer:
        "You can view upcoming deadlines on the 'Upcoming Deadlines' page, accessible from the main menu. It lists all assignments with their due dates and descriptions.",
      key: "deadline",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach support via the contact information below or submit a support request using the button in the Support Request section.",
      key: "contact",
    },
  ];

  const handleSupportRequest = () => {
    // Placeholder for submitting a support request
    // In a real app, this could navigate to a form or open an email client
    console.log("Support request submitted");
  };

  return (
    <PageContainers>
      <BackHeader title="Help and Support" />
      <ScrollView
        style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 16 }}
      >
        <ThemedText
          variant="h2"
          style={{ marginBottom: 16, color: colors.neutralTextPrimary }}
        >
          Help and Support
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
          Frequently Asked Questions
        </ThemedText>
        {faqs.map((faq) => (
          <View key={faq.key} style={styles.faqContainer}>
            <TouchableOpacity
              style={styles.faqHeader}
              onPress={() => toggleFAQ(faq.key as FAQKeys)}
            >
              <ThemedText
                variant="h4"
                style={{ color: colors.neutralTextPrimary }}
              >
                {faq.question}
              </ThemedText>
              <Feather
                name={
                  expandedFAQs[faq.key as FAQKeys]
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={20}
                color={colors.neutralTextSecondary}
              />
            </TouchableOpacity>
            {expandedFAQs[faq.key as FAQKeys] && (
              <ThemedText
                style={{ marginBottom: 16, color: colors.neutralTextSecondary }}
              >
                {faq.answer}
              </ThemedText>
            )}
          </View>
        ))}

        <ThemedText
          variant="h3"
          style={[
            styles.sectionTitle,
            { marginTop: 16, color: colors.neutralTextPrimary,     borderBottomColor: colors.neutralBorder,
 },
          ]}
        >
          Contact Information
        </ThemedText>
        <View style={styles.contactContainer}>
          <ThemedText style={{ color: colors.neutralTextSecondary }}>
            Email: support@schoolmgmt.edu
          </ThemedText>
          <ThemedText style={{ color: colors.neutralTextSecondary }}>
            Phone: +1-800-555-1234
          </ThemedText>
          <ThemedText style={{ color: colors.neutralTextSecondary }}>
            Office Hours: Monday - Friday, 9:00 AM - 5:00 PM WAT
          </ThemedText>
        </View>

        <ThemedText
          variant="h3"
          style={[
            styles.sectionTitle,
            { marginTop: 16, color: colors.neutralTextPrimary,     borderBottomColor: colors.neutralBorder,
 },
          ]}
        >
          Submit a Support Request
        </ThemedText>
        <Button
          title="Submit Request"
          variant="primary"
          onPress={handleSupportRequest}
          style={{ marginBottom: 16 }}
        />
      </ScrollView>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: 16,
    borderBottomWidth: 1,
    paddingBottom: 8
  },
  faqContainer: {
    marginBottom: 16,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  contactContainer: {
    marginBottom: 16,
    gap: 8,
  },
});

export default HelpAndSupport;
