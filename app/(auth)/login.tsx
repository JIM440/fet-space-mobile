import Button from "@/components/commons/buttons/Button";
import PageContainers from "@/components/commons/containers/PageContainer";
import InputEmail from "@/components/commons/inputs/auth-inputs/InputEmail";
import InputMatricule from "@/components/commons/inputs/auth-inputs/InputMatricule";
import InputPassword from "@/components/commons/inputs/auth-inputs/InputPassword";
import ThemedText from "@/components/commons/typography/ThemedText";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useThemeColor";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const SignIn = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === "light" ? COLORS.light : COLORS.dark;

  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [matriculeValid, setMatriculeValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [open, setOpen] = useState(false);

  const roles = [
    { label: "Student", value: "Student" },
    { label: "Teacher", value: "Teacher" },
  ];

  const isFormValid = () => {
    if (role === "Teacher") {
      return emailValid && passwordValid;
    } else {
      return matriculeValid && passwordValid;
    }
  };

  return (
    <PageContainers>
      <View style={styles.container}>
        {/* Placeholder Image */}
        <View
          style={{
            ...styles.imagePlaceholder,
            backgroundColor: colors.backgroundNeutral,
          }}
        />
        <ThemedText style={styles.signInAsText}>Sign In As:</ThemedText>
        <DropDownPicker
          open={open}
          value={role}
          items={roles}
          setOpen={setOpen}
          setValue={setRole}
          style={{
            backgroundColor: colors.backgroundNeutral,
            borderColor: "transparent",
            width: 150,
            marginBottom: 30,
            marginLeft: 16,
          }}
          dropDownContainerStyle={{
            backgroundColor: colors.backgroundMain,
            borderColor: colors.neutralBorder,
          }}
          textStyle={{
            color: colors.neutralTextSecondary,
          }}
          ArrowDownIconComponent={({ style }) => (
            <Entypo
              name="chevron-down"
              size={20}
              color={colors.neutralTextSecondary}
            />
          )}
          ArrowUpIconComponent={({ style }) => (
            <Entypo
              name="chevron-up"
              size={20}
              color={colors.neutralTextSecondary}
            />
          )}
          placeholder="Select Role"
          // onChangeValue={() => {
          //   setEmail("");
          //   setMatricule("");
          //   setPassword("");
          // }}
        />
        <View style={{ paddingHorizontal: 16 }}>
          {role === "Teacher" ? (
            <View style={{ gap: 16 }}>
              <InputEmail
                label="Email"
                value={email}
                onChangeText={setEmail}
                onValidChange={setEmailValid}
                placeholder="Enter your email"
              />
              <InputPassword
                label="Password"
                value={password}
                onChangeText={setPassword}
                onValidChange={setPasswordValid}
                placeholder="Enter your password"
              />
            </View>
          ) : (
            <View style={{ gap: 16 }}>
              <InputMatricule
                label="Matricule"
                value={matricule}
                onChangeText={setMatricule}
                onValidChange={setMatriculeValid}
                placeholder="Enter your matricule (e.g., fe12a345)"
              />
              <InputPassword
                label="Password"
                value={password}
                onChangeText={setPassword}
                onValidChange={setPasswordValid}
                placeholder="Enter your password"
              />
            </View>
          )}
          <Button
            title="Sign In"
            variant="primary"
            style={{ marginTop: 30 }}
            disabled={
              !(role === "teacher"
                ? emailValid && passwordValid
                : matriculeValid && passwordValid)
            }
            onPress={()=>{
              router.replace('/(public)/(drawer)/(tabs)/course')
            }}
          />
        </View>
      </View>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  signInAsText: {
    marginBottom: 4,
    marginLeft: 20,
    fontWeight: 600,
  },
});

export default SignIn;
