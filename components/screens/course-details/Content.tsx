import FileCard from "@/components/commons/cards/FileCard";
import files from "@/constants/static-data/files";
import React from "react";
import { View } from "react-native";

const Content = () => {
  return (
    <View style={{ flex: 1, gap: 16, marginBottom: 20 }}>
      {files.map((file, index) => (
        <FileCard key={index} file={file} />
      ))}
    </View>
  );
};

export default Content;
