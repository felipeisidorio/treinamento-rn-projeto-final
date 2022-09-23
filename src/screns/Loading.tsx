import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../contexts/auth';

export function Loading() {
  const {clientScreenStack} = useContext(AuthContext);

  const navigation = useNavigation();

  function nav() {
    if (clientScreenStack === 'clientDetails') {
      navigation.navigate('clientDetails');
    } else if (clientScreenStack === 'clientForm') {
      navigation.navigate('clientForm');
    }
  }
  useEffect(() => {
    nav();
  }, []);

  return (
    <View>
      <TouchableOpacity>
        <Text>loading</Text>
      </TouchableOpacity>
    </View>
  );
}
