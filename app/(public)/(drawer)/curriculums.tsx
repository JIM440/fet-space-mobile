import CurriculumCard from "@/components/commons/cards/CurriculumCard";
import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import React from "react";
import { View } from "react-native";

const curriculums = [
  { id: 1, name: "Civil Engineering" },
  { id: 2, name: "Chemical and Petroleum Engineering" },
  { id: 3, name: "Computer Engineering" },
  { id: 4, name: "Electrical and Electronic Engineering" },
  { id: 5, name: "Mechanical and Industrial Engineering" },
];
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
