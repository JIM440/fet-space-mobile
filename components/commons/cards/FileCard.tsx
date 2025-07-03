import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { fileProps } from "@/types";
import { getTimeAgo } from "@/utils/dateFormatter";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Linking, Modal, TouchableOpacity, View } from "react-native";
import { LocalSvg } from "react-native-svg/css";
import Button from "../buttons/Button";
import ThemedText from "../typography/ThemedText";

const FileCard = ({ file }: { file: fileProps }) => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [size, setSize] = useState<string | undefined>(file.size);
  const [pages, setPages] = useState<number | undefined>(file.pages);
  const [loading, setLoading] = useState(false);

  // Derive name from Cloudinary URL with decoding
  const deriveName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const parts = pathname.split("/");
      const publicIdWithExt = parts[parts.length - 1]; // e.g., "Use_Case_Modeling_and_Actor_Interaction.pdf"
      const publicId = publicIdWithExt.split(".")[0]; // e.g., "Use_Case_Modeling_and_Actor_Interaction"
      // Decode URL-encoded characters and replace underscores with spaces
      return decodeURIComponent(publicId).replace(/_/g, " ") || "Unnamed File";
    } catch (error) {
      console.log("Error parsing URL:", error);
      return "Unnamed File";
    }
  };

  // Derive file type from URL extension
  const getFileType = (url: string) => {
    try {
      const extension = url.split(".").pop()?.toLowerCase();
      switch (extension) {
        case "pdf":
          return "pdf";
        case "doc":
        case "docx":
          return "docx";
        case "ppt":
        case "pptx":
          return "ppt";
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          return "img";
        case "mp4":
        case "mov":
          return "video";
        default:
          return "unknown";
      }
    } catch (error) {
      console.log("Error determining file type:", error);
      return "unknown";
    }
  };

  // Calculate size from URL
  useEffect(() => {
    const fetchSize = async () => {
      setLoading(true);
      try {
        const response = await fetch(file.url, { method: "HEAD" });
        const contentLength = response.headers.get("Content-Length");
        if (contentLength) {
          const bytes = parseInt(contentLength, 10);
          setSize(formatBytes(bytes));
        } else {
          setSize("Unknown");
        }
      } catch (error) {
        console.log("Error fetching size:", error);
        setSize("Unknown");
      } finally {
        setLoading(false);
      }
    };

    if (file.url) fetchSize();
  }, [file.url]);

  // Placeholder for pages (requires pdf-lib for accurate counting)
  useEffect(() => {
    if (getFileType(file.url) === "pdf" && !pages) {
      setPages(1); // Default to 1 page; use pdf-lib for accurate count if needed
    }
  }, [file.url, pages]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleCardPress = () => {
    const fileType = getFileType(file.url);
    if (fileType === "img" || fileType === "video") {
      setIsModalVisible(true);
    } else if (fileType === "pdf" || fileType === "docx" || fileType === "doc" || fileType === "ppt") {
      Linking.openURL(file.url);
    }
  };

  const fileType = getFileType(file.url);

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={0.8}>
      <View
        style={{
          paddingVertical: 8,
          flexDirection: "row",
          gap: 8,
        }}
      >
        {fileType === "pdf" && (
          <LocalSvg asset={require("@/assets/icons/pdf.svg")} width={24} height={24} />
        )}
        {(fileType === "docx" || fileType === "doc") && (
          <LocalSvg asset={require("@/assets/icons/docs.svg")} width={24} height={24} />
        )}
        {fileType === "img" && (
          <LocalSvg asset={require("@/assets/icons/img.svg")} width={24} height={24} />
        )}
        {fileType === "ppt" && (
          <LocalSvg asset={require("@/assets/icons/ppt.svg")} width={24} height={24} />
        )}
        {fileType === "video" && (
          <LocalSvg asset={require("@/assets/icons/img.svg")} width={24} height={24} />
        )}
        {fileType === "unknown" && (
          <LocalSvg asset={require("@/assets/icons/img.svg")} width={24} height={24} />
        )}
        <View style={{ flex: 1 }}>
          <ThemedText numberOfLines={2}>{deriveName(file.url)}</ThemedText>
          <View style={{ flexDirection: "row", gap: 16 }}>
            {pages && (
              <ThemedText
                variant="caption"
                style={{ color: colors.neutralTextTertiary }}
              >
                {pages} pages
              </ThemedText>
            )}
            {loading ? (
              <ActivityIndicator size="small" color={colors.neutralTextTertiary} />
            ) : (
              <ThemedText
                variant="caption"
                style={{ color: colors.neutralTextTertiary }}
              >
                {size}
              </ThemedText>
            )}
            {file.created_at && (
              <ThemedText
                variant="caption"
                style={{ color: colors.neutralTextTertiary }}
              >
                {getTimeAgo(file.created_at)}
              </ThemedText>
            )}
            {(fileType === "pdf" || fileType === "docx" || fileType === "doc" || fileType === "ppt") && (
              <ThemedText>download_icon</ThemedText>
            )}
          </View>
        </View>
      </View>
      <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
          {fileType === "img" && (
            <Image source={{ uri: file.url }} style={{ width: 300, height: 300, resizeMode: "contain" }} />
          )}
          {fileType === "video" && (
            <Video
              source={{ uri: file.url }}
              style={{ width: 300, height: 300 }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              onError={(e) => console.log("Video Error", e)}
            />
          )}
          <Button title="Close" onPress={() => setIsModalVisible(false)} style={{ marginTop: 20 }} />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default FileCard;