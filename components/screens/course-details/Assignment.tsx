import AssignmentCard from "@/components/commons/cards/AssignmentCard";
import assignments from "@/constants/static-data/assignments";
import React from "react";
import { View } from "react-native";

const Assignments = () => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      {assignments.map((assignment, index) => (
        <AssignmentCard assignment={assignment} key={index} />
      ))}
    </View>
  );
};

export default Assignments;
