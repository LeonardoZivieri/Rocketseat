
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import Home from "../screens/Home"
import New from "../screens/New"
import Habit from "../screens/Habit"

function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={Home}></Screen>
            <Screen name="new" component={New}></Screen>
            <Screen name="habit" component={Habit}></Screen>
        </Navigator>
    )
}

export default AppRoutes;
