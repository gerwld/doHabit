import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import AddTaskScreen from "./AddTaskScreen";
import ShowDetailsTaskScreen from "./ShowDetailsTaskScreen";
import SettingsScreen from "./SettingsScreen";


const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home" component={HomeScreen}  options={{ headerShown: false }} />
                <Stack.Screen name="addtask" component={AddTaskScreen}  options={{ headerShown: true, title: "Add Task" }} />
                <Stack.Screen name="showdetailstask" component={ShowDetailsTaskScreen}  options={{ headerShown: true, title: "Details" }} />
                <Stack.Screen name="settings" component={SettingsScreen}  options={{ headerShown: true, title: "Settings" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
