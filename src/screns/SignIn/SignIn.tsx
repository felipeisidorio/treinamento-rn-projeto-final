import {useNavigation} from '@react-navigation/native';
import {useCallback, useContext, useEffect, useState} from 'react';
import {Image, Switch, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {THEME} from '../../theme/theme';
import {AuthContext} from '../../contexts/auth';
import logoImg from './../../assets/logo.png';
import {styles} from './styles';
import {InputTextForm} from '../../components/InputForm/InputTextForm';
import {createDataBase} from '../../store/sqlite/db';
import {authSignIn} from '../../store/firebase/firebase';

export function SignIn() {
  const navigation = useNavigation();
  const {
    signIn,
    userLogin,
    setUserLogin,
    userPassword,
    setUserPassword,
    rememberCredentials,
    setRememberCredentials,
  } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [credentialError, setCredentialError] = useState<boolean>(false);
  const createDB = useCallback(async () => {
    await createDataBase();
  }, []);

  async function logIn() {
    if (email && password) {
      if (await authSignIn(email, password)) {
        setCredentialError(false);
        setUserLogin(email);
        setUserPassword(password);
        signIn(true);
      } else {
        setCredentialError(true);
      }
    }
  }

  useEffect(() => {
    if (rememberCredentials) {
      setEmail(userLogin);
      setPassword(userPassword);
    }
    createDB();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        {credentialError ? (
          <Text style={styles.error}>
            {' '}
            Username/Password invalid. Try again.{' '}
          </Text>
        ) : (
          <></>
        )}
        <InputTextForm
          label="Username"
          placeholder="username@user.com"
          type={THEME.INPUT.TYPE.EMAIL}
          value={email}
          onChangeText={setEmail}
          onChange={() => setCredentialError(false)}
          autoCapitalize="none"
        />

        <InputTextForm
          label="Password"
          type={THEME.INPUT.TYPE.PASSWORD}
          value={password}
          onChangeText={setPassword}
          onChange={() => setCredentialError(false)}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            logIn();
          }}>
          <Text style={styles.submitButtonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.rememberCredatials}>
          <Switch
            trackColor={{true: THEME.COLORS.PRIMARY}}
            value={rememberCredentials}
            onValueChange={setRememberCredentials}
          />
          <Text style={styles.swichSpace}> Remember My Credential</Text>
        </View>
        <TouchableOpacity
          style={styles.useFormRedirect}
          onPress={() => navigation.navigate('userForm')}>
          <Text style={styles.useFormRedirectText}>Create accont</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
