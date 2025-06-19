import { pdfAssets } from "@/constants/"; // adjust path accordingly
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useEffect } from "react";
import { ActivityIndicator, Alert, Platform, View } from "react-native";

const CurriculumPdfViewer = () => {
  const { pdf } = useLocalSearchParams<{ pdf: string }>();

  useEffect(() => {
    const openPDF = async () => {
      try {
        const moduleAsset = pdfAssets[pdf];
        if (!moduleAsset) {
          throw new Error(`PDF not found for: ${pdf}`);
        }

        const asset = Asset.fromModule(moduleAsset);
        await asset.downloadAsync();

        const dest = FileSystem.documentDirectory + pdf;

        const fileInfo = await FileSystem.getInfoAsync(dest);
        if (!fileInfo.exists) {
          await FileSystem.copyAsync({ from: asset.localUri || asset.uri, to: dest });
        }

        if (Platform.OS === "android") {
          await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: dest,
            flags: 1,
            type: "application/pdf",
          });
        } else {
          await Sharing.shareAsync(dest, { mimeType: "application/pdf" });
        }
      } catch (error) {
        console.error("Failed to open PDF:", error);
        Alert.alert("Error", "Unable to open PDF file.");
      }
    };

    openPDF();
  }, [pdf]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default CurriculumPdfViewer;
