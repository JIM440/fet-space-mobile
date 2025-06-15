import { checkIfLoggedIn } from "@/utils/api/auth";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";

const PublicLayout = () => {
  // UseEffect to check if user is logged in
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLogIn = async () => {
      try {
        const loginStatus = await checkIfLoggedIn();
        setLoggedIn(loginStatus);
      } catch (error) {
        console.error("Error checking login status", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogIn();
  }, []);
  if (!loggedIn) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="settings" />
    </Stack>
  );
};

export default PublicLayout;
