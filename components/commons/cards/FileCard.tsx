import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { fileProps } from "@/types";
import React from "react";
import { Image, View } from "react-native";
import ThemedText from "../typography/ThemedText";

const FileCard = ({ file }: { file: fileProps }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  return (
    <View
      style={{
        paddingVertical: 0,
        flexDirection: "row",
        gap: 8,
      }}
    >
      {file.type === "pdf" && (
        <Image source={require("@/assets/icons/pdf.svg")} />
      )}
      {file.type === "docx" && (
        <Image source={require("@/assets/icons/docs.svg")} />
      )}
      {file.type === "img" && (
        <Image source={require("@/assets/icons/img.svg")} />
      )}
      {file.type === "ppt" && (
        <Image source={require("@/assets/icons/ppt.svg")} />
      )}
      <View style={{ flex: 1 }}>
        <ThemedText numberOfLines={2}>{file.name}</ThemedText>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <ThemedText
            variant="caption"
            style={{ color: colors.neutralTextTertiary }}
          >
            {file.pages} pages
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{ color: colors.neutralTextTertiary }}
          >
            {file.size}
          </ThemedText>
          {file.date && (
            <ThemedText
              variant="caption"
              style={{ color: colors.neutralTextTertiary }}
            >
              {file.date}
            </ThemedText>
          )}
        </View>
      </View>
    </View>
  );
};

export default FileCard;
