import {NavigationContainer} from '@react-navigation/native';
import {LoginRoutes} from './login.routes';

export type RootStackParamList = {
  userForm: undefined;
  clientList: undefined;
  clientForm: undefined;
  clientDetails: undefined;
  NotFound: undefined;
};

export function AppRoutes() {
  return (
    <NavigationContainer>
      <LoginRoutes />
    </NavigationContainer>
  );
}
