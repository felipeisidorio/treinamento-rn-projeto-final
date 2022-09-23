import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props extends TouchableOpacityProps { }

export function BackButton({ ...rest }: Props) {

    return (
        <TouchableOpacity {...rest}>
            <Text><Icon name="arrowleft" size={20} /></Text>
        </TouchableOpacity>
    );
}
