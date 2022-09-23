import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props extends TouchableOpacityProps {

}
export function DeleteButton({...rest}: Props) {

    return (
        <TouchableOpacity {...rest}>
            <Text style={styles.text}>
                <Icon name='delete' size={20} />
            </Text>
        </TouchableOpacity>
    );
}
