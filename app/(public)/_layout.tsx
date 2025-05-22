import { Redirect, Stack } from "expo-router";

const PublicLayout = () => {
  const loggedIn = true;
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
