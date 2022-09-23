import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { ClientDB, query, insert } from '../../store/sqlite/db';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

export function ClientList() {
    const { setClientSelected, enableClientStack } = useContext(AuthContext);

    const [clients, setClients] = useState<ClientDB[]>([])
    const [searchKey, setSearchKey] = useState<string>('')

    async function loadClientsList() {
        const list = await query('Clients', []);
        setClients(
            list.filter(
                el => searchKey.trim().length > 0
                    ?
                    (
                        el.state === 'Active'
                        && 
                        (
                            el.lastname
                                .toLocaleUpperCase()
                                .includes(searchKey.toLocaleUpperCase())
                            ||
                            el.firstname
                                .toLocaleUpperCase()
                                .includes(searchKey.toLocaleUpperCase())
                        )
                    )
                    :
                    el.state === 'Active'
            )
        )
    }
    
    useEffect(() => {
        loadClientsList();
    }, [searchKey]);

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    placeholder="Digite o nome do cliente"
                    style={styles.input}
                    onChangeText={setSearchKey}
                />
                <TouchableOpacity
                    style={styles.newClientButton}
                    onPress={
                        () => {
                            enableClientStack(true, 'clientForm')
                        }
                    }
                >
                    <Text>
                        <Icon name="adduser" size={30} />
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.list}
                keyExtractor={item => item.id}
                data={clients}
                renderItem={
                    ({ item }) => (
                        <TouchableOpacity
                            style={styles.listItem}
                            onPress={
                                () => {
                                    setClientSelected(item)
                                    enableClientStack(true, 'clientDetails')
                                }
                            }
                        >
                            <Text>{`${item.lastname}, ${item.firstname}`}</Text>
                            <Text>{`Id: ${item.id}`}</Text>
                            <Text>{`Contact: ${item.phone}`}</Text>
                        </TouchableOpacity>
                    )
                }
            />
        </View>
    );
}
