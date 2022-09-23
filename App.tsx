import { AppRoutes } from "./src/routes/app.routes";
import 'react-native-gesture-handler';
import { AuthProvider } from "./src/contexts/auth";

export default function App() {

  return (
    <AuthProvider>
      <AppRoutes  />
    </AuthProvider>
  );
};
