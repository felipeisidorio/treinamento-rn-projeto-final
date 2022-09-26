import {createDrawerNavigator} from '@react-navigation/drawer';
import {ClientList} from '../screns/ClientList/ClientList';
import {Conversion} from '../screns/Conversion/Conversion';
import {LogOff} from '../screns/LogOff';

const {Navigator, Screen} = createDrawerNavigator();

export function MenuRoutes() {
  return (
    <Navigator initialRouteName="clientList">
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
          title: 'LogOff',
        }}
      />
    </Navigator>
  );
}
