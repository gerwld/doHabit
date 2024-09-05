import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { habitsActions } from "actions";

const STORAGE_KEY = '@habits/items';


const useInitializeHabits = () => {
    const d = useDispatch();


    const loadHabits = async () => {
        
        try {
            const storedHabits = await AsyncStorage.getItem(STORAGE_KEY);
            console.info("storedHabits -", storedHabits);
            if (storedHabits !== null) {
                d(habitsActions.initializeHabits(JSON.parse(storedHabits)));
            }
        } catch (e) {
            console.error('Failed to load habits from storage', e);
        }
        d({type: "SET_HABITS_INIT", payload: true});
    };

    useEffect(() => {
        loadHabits();
    }, []);
};

export default useInitializeHabits;
