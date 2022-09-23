import { createDrawerNavigator } from "@react-navigation/drawer"
import { ClientList } from "../screns/ClientList/ClientList"
import { LogOff } from "../screns/LogOff"
import { Sync } from "../screns/Sync"

const { Navigator, Screen } = createDrawerNavigator()

export function MenuRoutes() {
    return (
        <Navigator initialRouteName="clientList" >
            <Screen
                name="clientList"
                component={ClientList}
                options={{
                    title: 'Client'
                }}
            />
            <Screen
                name="sync"
                component={Sync}
                options={{
                    title: 'Sync'
                }}
            />
            <Screen
                name="LogOff"
                component={LogOff}
                options={{
                    title: 'LogOff'
                }}
            />
        </Navigator>

    )
}