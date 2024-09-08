import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appActions, habitsActions } from "actions";

const useInitializeApp = () => {
    const d = useDispatch();

    const loadPart = async () => {
        
        try {
            const storedSet = await AsyncStorage.getItem('@settings');
            if (storedSet !== null) {
                d(appActions.initializeApp(JSON.parse(storedSet)));
            }
        } catch (e) {
            console.error('Failed to load habits from storage', e);
        }
    };

    const loadHabits = async () => {  
        try {
            const storedHabits = await AsyncStorage.getItem('@habits/items');
            if (storedHabits !== null) {
                d(habitsActions.initializeHabits(JSON.parse(storedHabits)));
            }
        } catch (e) {
            console.error('Failed to load habits from storage', e);
        }
        d({type: "SET_HABITS_INIT", payload: true});
    };

    useEffect(() => {
        loadPart();
        loadHabits();
    }, []);

};

export default useInitializeApp;
