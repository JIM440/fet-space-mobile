import PageContainers from "@/components/commons/containers/PageContainer";
import BackHeader from "@/components/commons/navigation/BackHeader";
import ThemedText from "@/components/commons/typography/ThemedText";
import React from "react";

const EditProfile = () => {
  return (
    <PageContainers>
      <BackHeader title="Edit Profile" />
      <ThemedText>Edit Profile</ThemedText>
    </PageContainers>
  );
};

export default EditProfile;
