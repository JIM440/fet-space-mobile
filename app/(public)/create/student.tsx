import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import React from "react";

const AddStudent = () => {
  return (
    <PageContainers>
      <BackHeader title="Add Student" />
      {/* search bar */}
      {/* we will search for a student using the matricule (the search will be allowed to go to only when the full matricule is entered). also ensure the keyboard is the search keyboard */}
      {/* search results */}
      {/* list of returned users */}
      <ThemedText>Student</ThemedText>
    </PageContainers>
  );
};

export default AddStudent;
