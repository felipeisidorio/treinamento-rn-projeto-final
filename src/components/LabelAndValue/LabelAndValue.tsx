import { Text, View } from 'react-native';
import { THEME } from '../../theme/theme';
import { styles } from './styles';

interface LabelAndValueProps {
    label: string;
    value: string | boolean | number | string[] | number[] | null | undefined;
}
export function LabelAndValue({label, value }: LabelAndValueProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <Text>{value}</Text>
        </View>
    );
}
