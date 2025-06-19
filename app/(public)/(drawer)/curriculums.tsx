import CurriculumCard from "@/components/commons/cards/CurriculumCard";
import PageContainers from "@/components/commons/containers/PageContainer";
import { BackHeader } from "@/components/commons/navigation/BackHeader";
import React from "react";
import { View } from "react-native";

  const curriculums = [
  { id: 1, name: "Civil Engineering", pdf: "computer_engineering.pdf" },
  { id: 2, name: "Chemical and Petroleum Engineering", pdf: "computer_engineering.pdf" },
  { id: 3, name: "Computer Engineering", pdf: "computer_engineering.pdf" },
  { id: 4, name: "Electrical and Electronic Engineering", pdf: "computer_engineering.pdf" },
  { id: 5, name: "Mechanical and Industrial Engineering", pdf: "computer_engineering.pdf" },
];

//   const curriculums = [
//   { id: 1, name: "Civil Engineering", pdf: require("@/assets/documents/civil_engineering.pdf") },
//   { id: 2, name: "Chemical and Petroleum Engineering", pdf: require("@/assets/documents/chemical_engineering.pdf") },
//   { id: 3, name: "Computer Engineering", pdf: require("@/assets/documents/computer_engineering.pdf") },
//   { id: 4, name: "Electrical and Electronic Engineering", pdf: require("@/assets/documents/electrical_engineering.pdf") },
//   { id: 5, name: "Mechanical and Industrial Engineering", pdf: require("@/assets/documents/mechanical_engineering.pdf") },
// ];
const Curriculums = () => {
  return (
    <PageContainers>
      <BackHeader title="Curriculums" />
      <View style={{padding: 20}}>
      {curriculums.map((curriculum) => (
        <CurriculumCard key={curriculum.id} curriculum={curriculum} />
      ))}
      </View>
    </PageContainers>
  );
};

export default Curriculums;
