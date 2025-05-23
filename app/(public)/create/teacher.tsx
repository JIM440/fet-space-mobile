import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import React from "react";

const AddTeacher = () => {
  return (
    <PageContainers>
      <BackHeader title="Add Teacher" />
      {/* search bar */}
      {/* we will search for a teacher using the name. also ensure the keyboard is the search keyboard */}
      {/* search results */}
      {/* list of returned users */}
      <ThemedText>Teacher</ThemedText>
    </PageContainers>
  );
};

export default AddTeacher;
