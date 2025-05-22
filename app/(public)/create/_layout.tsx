import { Redirect, Stack } from "expo-router";

const PublicLayout = () => {
  const loggedIn = true;
  if (!loggedIn) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="assignment" />
      <Stack.Screen name="student" />
      <Stack.Screen name="teacher" />
    </Stack>
  );
};

export default PublicLayout;
