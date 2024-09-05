import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import AddHabitScreen from "./AddHabitScreen";
import SettingsScreen from "./SettingsScreen";
import { useTranslation } from "react-i18next";
import TutorialScreen from "./TutorialScreen";
import HabitDetailsScreen from "./HabitDetailsScreen";


const Stack = createNativeStackNavigator();

export const Navigation = () => {
    const {t} = useTranslation();

    const navTheme = DefaultTheme;
    navTheme.colors.background = '#f2f2f7';

    return (
        <NavigationContainer theme={navTheme}>
            <Stack.Navigator>
                <Stack.Screen name="home" component={HomeScreen}  options={{ headerShown: false, title: t("home_screen") }} />
                <Stack.Screen name="tutorial" component={TutorialScreen}  options={{ headerShown: false, title: t("tutorial") }} />
                <Stack.Screen name="settings" component={SettingsScreen}  options={{ headerShown: false, title: t("st_screen") }} />
                <Stack.Screen name="addhabit" component={AddHabitScreen}  options={{ headerShown: false, title: t("addt_screen") }} />
                <Stack.Screen name="habitdetails" component={HabitDetailsScreen}  options={{ headerShown: true, title: "Habit Details" }} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}



// gestureEnabled: true, // Enable gestures for swipe-down-to-close
// gestureDirection: 'vertical', // Vertical gesture (from top or bottom)
// cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Bottom-to-top transition