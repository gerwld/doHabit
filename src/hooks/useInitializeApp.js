import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appActions } from "actions";

const STORAGE_KEY = '@settings';


const useInitializeApp = () => {
    const d = useDispatch();

    const loadPart = async () => {
        
        try {
            const storedSet = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedSet !== null) {
                d(appActions.initializeApp(JSON.parse(storedSet)));
            }
        } catch (e) {
            console.error('Failed to load habits from storage', e);
        }
    };

    useEffect(() => {
        loadPart();
    }, []);

};

export default useInitializeApp;
