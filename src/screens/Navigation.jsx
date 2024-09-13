import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import { useTranslation } from "react-i18next";
import TutorialScreen from "./TutorialScreen";
import DetailsHabitScreen from "./DetailsHabitScreen";
import SettingsScreen from "./SettingsScreen";
import AHSRepeat from "./subsreens/AHSRepeat";
import STLanguage from "./subsreens/STLanguage";
import STTheme from "./subsreens/STTheme";
import { useSelector } from "react-redux";
import { getTheme } from "@constants";
import { appSelectors } from "@redux";
import SetHabitScreen from "./SetHabitScreen";


const Stack = createNativeStackNavigator();

export const Navigation = () => {
    const { t } = useTranslation();
    const theme = useSelector(appSelectors.selectAppTheme);

    const navTheme = DefaultTheme;
    navTheme.colors = {
        primary: 'rgb(0, 122, 255)',
        card: 'rgb(255, 255, 255)',
        text: getTheme(theme).textColorHighlight,
        border: getTheme(theme).borderColor,
        notification: 'rgb(255, 59, 48)',
        background: getTheme(theme).background
    };

    const EditHabitScreen = (props) => <SetHabitScreen isEdit {...props}/>

    const addEditSubdirectories = (
        <>
            <Stack.Screen name="addhabit" component={SetHabitScreen} options={{ headerShown: false, title: t("addt_screen") }} />
            <Stack.Screen name="edithabit" component={EditHabitScreen} options={{ headerShown: false, title: t("addt_screen") }} />
            <Stack.Screen name="sethabit/repeat" component={AHSRepeat} options={{ headerShown: false, title: "Habit Details" }} />
        </>
    )

    const settingsSubdirectories = (
        <>
            <Stack.Screen name="settings" component={SettingsScreen} options={{ headerShown: false, title: t("st_screen") }} />
            <Stack.Screen name="settings/language" component={STLanguage} options={{ headerShown: false, title: t("st_screen") }} />
            <Stack.Screen name="settings/theme" component={STTheme} options={{ headerShown: false, title: t("st_screen") }} />
        </>
    )

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false, title: t("home_screen") }} />
                <Stack.Screen name="habitdetails" component={DetailsHabitScreen} options={{ headerShown: false, title: "Habit Details" }} />
                {addEditSubdirectories}
                {settingsSubdirectories}
                <Stack.Screen
                    name="tutorial"
                    component={TutorialScreen}
                    options={{
                        headerShown: false,
                        title: t("tutorial_screen"),
                        animationTypeForReplace: 'push',
                        animation: 'fade'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



// gestureEnabled: true, // Enable gestures for swipe-down-to-close
// gestureDirection: 'vertical', // Vertical gesture (from top or bottom)
// cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Bottom-to-top transition