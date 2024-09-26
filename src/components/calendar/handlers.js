import AsyncStorage from "@react-native-async-storage/async-storage";

 // should be called each time when you want to change currentMonth in storage. 
 // when you want to set specific month on init, etc.
 export const handleMonthChange = async (newMonth) => {
    try {
        await AsyncStorage.setItem('@calendar/selected-month', JSON.stringify(newMonth));
    } catch (error) {
        console.error('Failed to save month', error);
    }
};

// gets month from async storage which prevents jumps when payload changes.
export const getStoredMonth = async () => {
    try {
        const storedMonth = await AsyncStorage.getItem('@calendar/selected-month');
        if (storedMonth !== null) {
            return JSON.parse(storedMonth);
        }
    } catch (error) {
        console.error('Failed to load stored month', error);
    }
    return null
}