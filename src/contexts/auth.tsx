import {createContext, PropsWithChildren, useState} from 'react';
import {ClientDB} from '../store/sqlite/db';
import {Clients} from '../utils/data';

interface AuthProps {
  login: boolean;
  clientStack: boolean;
  clientScreenStack: string;
  signIn: (status: boolean) => void;
  enableClientStack: (status: boolean, screen: string) => void;
  clientSelected: ClientDB;
  setClientSelected: (client: ClientDB) => void;
  userLogin: string;
  userPassword: string;
  setUserLogin: (uLogin: string) => void;
  setUserPassword: (uPassword: string) => void;
  rememberCredentials: boolean;
  setRememberCredentials: (status: boolean) => void;
}
export const AuthContext = createContext({} as AuthProps);

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [rememberCredentials, setRememberCredentials] =
    useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [login, setLogin] = useState<boolean>(false);
  const [clientStack, setClientStack] = useState<boolean>(false);
  const [clientScreenStack, setclientScreenStack] = useState<string>('');
  const [client, setClient] = useState<ClientDB>(Clients[0]);

  function signIn(status: boolean = true) {
    setLogin(status);
    if (!status) {
      setClient(Clients[0]);
    }
  }
  function enableClientStack(status: boolean = false, screen: string) {
    setclientScreenStack(screen);
    setClientStack(status);
    if (!status) {
      setClient(Clients[0]);
    }
  }

  function setClientSelected(clientParam: ClientDB) {
    setClient(clientParam);
  }

  return (
    <AuthContext.Provider
      value={{
        login: login,
        signIn,
        clientSelected: client,
        setClientSelected,
        clientStack: clientStack,
        enableClientStack,
        clientScreenStack: clientScreenStack,
        userLogin: userLogin,
        userPassword: userPassword,
        setUserLogin,
        setUserPassword,
        rememberCredentials: rememberCredentials,
        setRememberCredentials,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
