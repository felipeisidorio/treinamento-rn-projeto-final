import { Text, TouchableOpacity, View } from 'react-native';
import { query } from '../store/sqlite/db';

export function Sync() {

    async function fullSync() {
        await query('Clients', []);
    }
    return (
        <View>
            <TouchableOpacity onPress={fullSync}>
                <Text>
                    sync
                </Text>
            </TouchableOpacity>
        </View>
    );
}
