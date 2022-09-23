import {Text, TextInput, TextInputProps, View} from 'react-native';
import {THEME} from '../../theme/theme';
import {styles} from './styles';

interface InputTextForm extends TextInputProps {
  type: string;
  label: string;
  placeholder?: string;
}

export function InputTextForm({
  type,
  label,
  placeholder = '',
  ...rest
}: InputTextForm) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={type === THEME.INPUT.TYPE.PASSWORD ? true : false}
        {...rest}
      />
    </View>
  );
}
