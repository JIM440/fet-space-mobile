import { ThemeProvider } from "@/context/ThemeContext";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  //   const [loaded] = useFonts({
  //   "Product-Sans-Regular": require("../assets/fonts/google-sans/ProductSans-Regular.ttf"),
  //   "Product-Sans-Medium": require("../assets/fonts/google-sans/ProductSans-Medium.ttf"),
  //   "Product-Sans-Bold": require("../assets/fonts/google-sans/ProductSans-Bold.ttf"),
  //   "Product-Sans-Light": require("../assets/fonts/google-sans/ProductSans-Light.ttf"),
  //   "Product-Sans-Thin": require("../assets/fonts/google-sans/ProductSans-Thin.ttf"),
  // });

  // const [loaded] = useFonts({
    // "OpenSans-Regular": require("../assets/fonts/Open_Sans/static/OpenSans_Condensed-Regular.ttf"),
    // "OpenSans-Medium": require("../assets/fonts/Open_Sans/static/OpenSans_Condensed-Medium.ttf"),
    // "OpenSans-Bold": require("../assets/fonts/Open_Sans/static/OpenSans_Condensed-Bold.ttf"),
    // "OpenSans-Light": require("../assets/fonts/Open_Sans/static/OpenSans_Condensed-Light.ttf"),
    // "OpenSans-Thin": require("../assets/fonts/Open_Sans/static/OpenSans_Condensed-Thin.ttf"),
  // });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
