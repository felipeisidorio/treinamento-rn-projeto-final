import {useContext, useEffect} from 'react';
import {AuthContext} from '../contexts/auth';
import {authSignOut} from '../store/firebase/firebase';

export function LogOff() {
  const {signIn} = useContext(AuthContext);

  useEffect(() => {
    authSignOut();
    signIn(false);
  }, []);
  return <></>;
}
