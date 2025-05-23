// screens/UserListScreen.js
import ProfileCard from "@/components/commons/cards/ProfileCard";
import ThemedText from "@/components/commons/typography/ThemedText";
import users from "@/constants/static-data/users";
import React from "react";
import { StyleSheet, View } from "react-native";

const UserListScreen = () => {
  return (
    <View style={{ ...styles.container }}>
      <ThemedText variant="h3" style={styles.header}>
        Teachers
      </ThemedText>
        {users.teachers.map((teacher) => (
          <ProfileCard key={teacher.id} user={teacher} type="teacher" />
        ))}

      <ThemedText variant="h3" style={{ ...styles.header, marginTop: 30 }}>
        Students
      </ThemedText>
        {users.students.map((student) => (
          <ProfileCard key={student.id} user={student} type="student" />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default UserListScreen;
