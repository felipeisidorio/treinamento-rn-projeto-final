import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputTextForm} from '../../components/InputForm/InputTextForm';
import {THEME} from '../../theme/theme';
import {styles} from './styles';
import logoImg from './../../assets/logo.png';
import {createUser} from '../../store/firebase/firebase';

export function UserForm() {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  function goBack() {
    navigation.goBack();
  }

  function create() {
    createUser(email, password);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <InputTextForm
          label="Username"
          placeholder="username@user.com"
          type={THEME.INPUT.TYPE.EMAIL}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <InputTextForm
          label="Password"
          type={THEME.INPUT.TYPE.PASSWORD}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <InputTextForm
          label="Confirm Password"
          type={THEME.INPUT.TYPE.PASSWORD}
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={() => {
            create();
          }}>
          <Text style={styles.submitButtonText}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => {
            goBack();
          }}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
