import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../../components/BackButton/BackButton';
import { styles } from './styles';

export function UserForm() {
    const navigation = useNavigation();
   
    function goBack() {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={styles.safeArea}>

            <View style={styles.container}>
                <BackButton onPress={goBack} />
            </View>
        </SafeAreaView>
    );
}
