import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import AddTaskScreen from "./AddTaskScreen";
import ShowDetailsTaskScreen from "./ShowDetailsTaskScreen";
import SettingsScreen from "./SettingsScreen";
import { useTranslation } from "react-i18next";
import TutorialScreen from "./TutorialScreen";


const Stack = createNativeStackNavigator();

export const Navigation = () => {
    const {t} = useTranslation();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home" component={HomeScreen}  options={{ headerShown: false }} />
                <Stack.Screen name="tutorial" component={TutorialScreen}  options={{ headerShown: false }} />
                <Stack.Screen name="addtask" component={AddTaskScreen}  options={{ headerShown: true, title: t("addt_screen") }} />
                <Stack.Screen name="showdetailstask" component={ShowDetailsTaskScreen}  options={{ headerShown: true, title: "Habit Details" }} />
                <Stack.Screen name="settings" component={SettingsScreen}  options={{ headerShown: true, title: t("st_screen") }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
