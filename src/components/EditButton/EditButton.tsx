import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props extends TouchableOpacityProps {}

export function EditButton({...rest}: Props) {
  return (
    <TouchableOpacity {...rest}>
      <Text style={styles.text}>
        <Icon name="edit" size={20} />
      </Text>
    </TouchableOpacity>
  );
}
