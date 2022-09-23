import {AppRoutes} from './src/routes/app.routes';
import {AuthProvider} from './src/contexts/auth';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
