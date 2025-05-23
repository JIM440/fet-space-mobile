import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import React from "react";

const Announcement = () => {
  return (
    <PageContainers>
      <BackHeader title="" />
      <ThemedText>General Announcement</ThemedText>
    </PageContainers>
  );
};

export default Announcement;
