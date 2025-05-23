import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import React from "react";

const UserDetails = () => {
  return (
    <PageContainers>
      <BackHeader title="" />
      <ThemedText>User Details</ThemedText>
    </PageContainers>
  );
};

export default UserDetails;
