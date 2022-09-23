import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {AuthContext} from '../contexts/auth';
import {SignIn} from '../screns/SignIn/SignIn';
import {UserForm} from '../screns/UserForm/UserForm';
import {ClientRoutes} from './client.routes';
import {MenuRoutes} from './menu.routes';

const {Navigator, Screen} = createNativeStackNavigator();

export function LoginRoutes() {
  const {login, clientStack} = useContext(AuthContext);

  return (
    <Navigator screenOptions={{headerShown: false}}>
      {login ? (
        clientStack ? (
          <Screen name="clientRoutes" component={ClientRoutes} />
        ) : (
          <Screen name="menuRoutes" component={MenuRoutes} />
        )
      ) : (
        <>
          <Screen name="signIn" component={SignIn} />
          <Screen name="userForm" component={UserForm} />
        </>
      )}
    </Navigator>
  );
}
