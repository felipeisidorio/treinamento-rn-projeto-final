import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientDetails } from "../screns/ClientDetails/ClientDetails";
import { ClientForm } from "../screns/ClientForm/ClientForm";
import { Loading } from "../screns/Loading";

const { Navigator, Screen } = createNativeStackNavigator();

export function ClientRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="loading"
                component={Loading}
            />
            <Screen
                name="clientDetails"
                component={ClientDetails}
            />
            <Screen
                name="clientForm"
                component={ClientForm}
            />
        </Navigator>
    )
}