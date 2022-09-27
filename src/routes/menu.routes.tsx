import {createDrawerNavigator} from '@react-navigation/drawer';
import {ClientList} from '../screns/ClientList/ClientList';
import {Conversion} from '../screns/Conversion/Conversion';
import {LogOff} from '../screns/LogOff';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {THEME} from '../theme/theme';
import {Text} from 'react-native-paper';
import {View} from 'react-native';

const {Navigator, Screen} = createDrawerNavigator();

export function MenuRoutes() {
  return (
    <Navigator
      initialRouteName="clientList"
      screenOptions={{
        headerTintColor: THEME.COLORS.PRIMARY,
        drawerActiveTintColor: THEME.COLORS.PRIMARY,
      }}>
      <Screen
        name="clientList"
        component={ClientList}
        options={{
          title: 'Client',
        }}
      />
      <Screen
        name="sync"
        component={Conversion}
        options={{
          title: 'Conversion',
        }}
      />
      <Screen
        name="LogOff"
        component={LogOff}
        options={{
          title: '',

          drawerIcon: () => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: THEME.COLORS.CAPTION_500,
                    paddingRight: 10,
                  }}>
                  Logout
                </Text>
                <AntDesign
                  name="logout"
                  size={15}
                  color={THEME.COLORS.CAPTION_500}
                />
              </View>
            );
          },
        }}
      />
    </Navigator>
  );
}
