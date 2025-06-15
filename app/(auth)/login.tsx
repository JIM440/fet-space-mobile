import Button from '@/components/commons/buttons/Button';
import PageContainers from '@/components/commons/containers/PageContainer';
import InputEmail from '@/components/commons/inputs/auth-inputs/InputEmail';
import InputMatricule from '@/components/commons/inputs/auth-inputs/InputMatricule';
import InputPassword from '@/components/commons/inputs/auth-inputs/InputPassword';
import { OverlaySpinner } from '@/components/commons/loaders/spinners';
import ThemedText from '@/components/commons/typography/ThemedText';
import { COLORS } from '@/constants/colors';
import { useLogin } from '@/hooks/api/auth/index';
import { useTheme } from '@/hooks/useThemeColor';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';

const SignIn: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === 'light' ? COLORS.light : COLORS.dark;

  const [role, setRole] = useState<'Student' | 'Teacher'>('Student');
  const [email, setEmail] = useState<string>('');
  const [matricule, setMatricule] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [matriculeValid, setMatriculeValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { mutate: login, isPending } = useLogin();

  const roles = [
    { label: 'Student', value: 'Student' },
    { label: 'Teacher', value: 'Teacher' },
  ];

  const isFormValid = () => {
    return role === 'Teacher' ? emailValid && passwordValid : matriculeValid && passwordValid;
  };

  const handleLogin = () => {
    const identifier = role === 'Teacher' ? email : matricule;
    login(
      { identifier, password, role },
      {
        onSuccess: (data) => {
          console.log('Login successful:', data);
          router.replace('/(public)/(drawer)/(tabs)/course');
        },
        onError: (error) => {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: error.message || 'Invalid credentials',
          });
        },
      }
    );
  };

  return (
    <PageContainers>
      <View style={styles.container}>
          { isPending && <OverlaySpinner />}
        <View
          style={{
            ...styles.titleContainer,
            // ...styles.imagePlaceholder,
            // backgroundColor: colors.backgroundNeutral,
          }}
        >
          <ThemedText variant='h2' style={{fontSize: 52, lineHeight: 56}}>FET SPACE</ThemedText>
        </View>
        <ThemedText style={styles.signInAsText}>Sign In As:</ThemedText>
        <DropDownPicker
          open={open}
          value={role}
          items={roles}
          setOpen={setOpen}
          setValue={setRole}
          style={{
            backgroundColor: colors.backgroundNeutral,
            borderColor: 'transparent',
            width: 150,
            marginBottom: 30,
            marginLeft: 16,
          }}
          dropDownContainerStyle={{
            backgroundColor: colors.backgroundMain,
            borderColor: colors.neutralBorder,
          }}
          textStyle={{
            color: colors.neutralTextPrimary,
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
        />
        <View style={{ paddingHorizontal: 16 }}>
          {role === 'Teacher' ? (
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
            disabled={!isFormValid() || isPending}
            onPress={handleLogin}
          />
        </View>
      </View>
    </PageContainers>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  signInAsText: {
    marginBottom: 4,
    marginLeft: 20,
    fontWeight: '600',
  },
});

export default SignIn;