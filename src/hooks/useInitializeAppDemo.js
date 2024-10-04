import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appActions, habitsActions } from "actions";
import i18n from '../../i18n';
import { LogBox, useColorScheme } from 'react-native';
import { Appearance } from 'react-native';
import { getLocales } from 'expo-localization';
import { LANG_MASKS } from '@constants';


LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

// hook initializer
const useInitializeAppDemo = (lang) => {
    const d = useDispatch();

    // STEP 1: assign parts as functions to get state portions 
    const loadBase = async () => {
        try {
            const storedSet = await AsyncStorage.getItem('@settings');
            if (storedSet !== null) {
                let set = JSON.parse(storedSet);
                delete set.system_theme;
                d(appActions.initializeApp(set));
            }
        } catch (e) {
            console.error('Failed to load settings from storage', e);
        }
    };

    const loadHabits = async () => {
        try {
            const storedHabits = {
              "77019ff4-a852-476f-9409-48129aad9d75": {
                color: "#AF52DE",
                name: "Drink at least 1l of water",
                notification: "",
                remind: false,
                repeat: "every-day",
                id: "77019ff4-a852-476f-9409-48129aad9d75",
                datesArray: [
                  1727733600000, 1727820000000, 1727906400000, 1727992800000,
                  1727992800000, 1725487200000, 1726092000000, 1726696800000,
                  1727301600000, 1727215200000, 1726610400000, 1726005600000,
                  1725400800000, 1725919200000, 1726524000000, 1725228000000,
                  1726783200000, 1727474400000, 1726351200000, 1725660000000,
                  1726264800000, 1726178400000, 1723586400000, 1724191200000,
                  1724796000000, 1724882400000, 1724968800000, 1725055200000,
                  1724450400000, 1724364000000, 1723759200000, 1722463200000,
                  1722636000000, 1723932000000, 1722808800000, 1724104800000,
                  1724623200000, 1723068000000, 1721167200000, 1721772000000,
                  1722376800000, 1720476000000, 1722290400000, 1720994400000,
                  1720044000000, 1721340000000, 1722031200000, 1720908000000,
                  1722117600000, 1720216800000, 1720562400000, 1719784800000,
                  1718661600000, 1718229600000, 1719439200000, 1719525600000,
                  1718402400000, 1719698400000, 1717711200000, 1717365600000,
                  1719180000000, 1718143200000, 1717192800000, 1717624800000,
                  1714514400000, 1715724000000, 1715205600000, 1715896800000,
                  1715378400000, 1716674400000, 1714773600000, 1716415200000,
                  1716501600000, 1716588000000, 1715983200000, 1716328800000,
                  1716242400000, 1716156000000, 1715032800000, 1715119200000,
                  1717020000000, 1716933600000, 1716847200000, 1718920800000,
                  1718834400000, 1718748000000, 1719007200000, 1719093600000,
                  1718575200000, 1719266400000, 1719352800000, 1718316000000,
                  1718056800000, 1717970400000, 1717797600000, 1712527200000,
                  1712613600000, 1712786400000, 1712959200000, 1714168800000,
                  1713391200000, 1713996000000, 1713477600000, 1714255200000,
                  1712440800000, 1714428000000, 1713218400000, 1712095200000,
                  1712181600000, 1712268000000, 1712354400000, 1714341600000,
                  1713823200000, 1713909600000, 1710111600000, 1710198000000,
                  1710370800000, 1710543600000, 1711062000000, 1709679600000,
                  1709334000000, 1711753200000, 1710630000000, 1709420400000,
                  1711494000000, 1711407600000, 1711321200000, 1710716400000,
                  1710802800000, 1710889200000, 1710975600000, 1711580400000,
                  1711148400000, 1711666800000, 1707174000000, 1707260400000,
                  1708383600000, 1708556400000, 1708642800000, 1708729200000,
                  1705273200000, 1705446000000,
                ],
              },
              "68797eaa-1a9d-4f5d-97c8-a68d2617f0f1": {
                color: "#e44244",
                name: "Running 15km / 6:00",
                notification: "",
                remind: false,
                repeat: "every-day",
                id: "68797eaa-1a9d-4f5d-97c8-a68d2617f0f1",
                datesArray: [1727647200000, 1727733600000, 1727992800000,
                    1727992800000, 1725487200000, 1726092000000, 1726696800000,
                    1727301600000, 1727215200000, 1726610400000, 1726005600000,
                    1725400800000, 1725919200000, 1726524000000, 1725228000000,
                    1726783200000, 1727474400000, 1726351200000, 1725660000000,
                    1726264800000, 1726178400000, 1723586400000, 1724191200000,
                    1724796000000, 1724882400000, 1724968800000, 1725055200000,
                    1724450400000, 1724364000000, 1723759200000, 1722463200000,
                    1722636000000, 1723932000000, 1722808800000, 1724104800000,
                    1724623200000, 1723068000000, 1721167200000, 1721772000000,
                    1722376800000, 1720476000000, 1722290400000, 1720994400000,
                    1720044000000, 1721340000000, 1722031200000, 1720908000000,
                    1722117600000, 1720216800000, 1720562400000, 1719784800000,
                    1718661600000, 1718229600000, 1719439200000, 1719525600000,
                    1718402400000, 1719698400000, 1717711200000, 1717365600000,
                    1719180000000, 1718143200000, 1717192800000, 1717624800000,
                    1714514400000, 1715724000000, 1715205600000, 1715896800000,
                    1715378400000, 1716674400000, 1714773600000, 1716415200000,
                    1716501600000, 1716588000000, 1715983200000, 1716328800000,
                    1716242400000, 1716156000000, 1715032800000, 1715119200000,
                    1717020000000, 1716933600000, 1716847200000, 1718920800000,
                    1718834400000, 1718748000000, 1719007200000, 1719093600000,
                    1718575200000, 1719266400000, 1719352800000, 1718316000000,
                    1718056800000, 1717970400000, 1717797600000, 1712527200000,
                    1712613600000, 1712786400000, 1712959200000, 1714168800000,
                    1713391200000, 1713996000000, 1713477600000, 1714255200000,
                    1712440800000, 1714428000000, 1713218400000, 1712095200000,
                    1712181600000, 1712268000000, 1712354400000, 1714341600000,
                    1713823200000, 1713909600000, 1710111600000, 1710198000000,
                    1710370800000, 1710543600000, 1711062000000, 1709679600000,
                    1709334000000, 1711753200000, 1710630000000, 1709420400000,
                    1711494000000, 1711407600000, 1711321200000, 1710716400000,
                    1710802800000, 1710889200000, 1710975600000, 1711580400000,
                    1711148400000, 1711666800000, 1707174000000, 1707260400000,
                    1708383600000, 1708556400000, 1708642800000, 1708729200000,
                    1705273200000, 1705446000000,
                ],
              },
              "2e72625e-9f9d-4f09-a27b-070f4d45a691": {
                color: "#69dd91",
                name: "Wake up at 6AM",
                notification: "",
                remind: false,
                repeat: "every-day",
                id: "2e72625e-9f9d-4f09-a27b-070f4d45a691",
                datesArray: [
                  1727647200000, 1727820000000, 1727906400000, 1727992800000,
                  1727992800000, 1725487200000, 1726092000000, 1726696800000,
                  1727301600000, 1727215200000, 1726610400000, 1726005600000,
                  1725400800000, 1725919200000, 1726524000000, 1725228000000,
                  1726783200000, 1727474400000, 1726351200000, 1725660000000,
                  1726264800000, 1726178400000, 1723586400000, 1724191200000,
                  1724796000000, 1724882400000, 1724968800000, 1725055200000,
                  1724450400000, 1724364000000, 1723759200000, 1722463200000,
                  1722636000000, 1723932000000, 1722808800000, 1724104800000,
                  1724623200000, 1723068000000, 1721167200000, 1721772000000,
                  1722376800000, 1720476000000, 1722290400000, 1720994400000,
                  1720044000000, 1721340000000, 1722031200000, 1720908000000,
                  1722117600000, 1720216800000, 1720562400000, 1719784800000,
                  1718661600000, 1718229600000, 1719439200000, 1719525600000,
                  1718402400000, 1719698400000, 1717711200000, 1717365600000,
                  1719180000000, 1718143200000, 1717192800000, 1717624800000,
                  1714514400000, 1715724000000, 1715205600000, 1715896800000,
                  1715378400000, 1716674400000, 1714773600000, 1716415200000,
                  1716501600000, 1716588000000, 1715983200000, 1716328800000,
                  1716242400000, 1716156000000, 1715032800000, 1715119200000,
                  1717020000000, 1716933600000, 1716847200000, 1718920800000,
                  1718834400000, 1718748000000, 1719007200000, 1719093600000,
                  1718575200000, 1719266400000, 1719352800000, 1718316000000,
                  1718056800000, 1717970400000, 1717797600000, 1712527200000,
                  1712613600000, 1712786400000, 1712959200000, 1714168800000,
                  1713391200000, 1713996000000, 1713477600000, 1714255200000,
                  1712440800000, 1714428000000, 1713218400000, 1712095200000,
                  1712181600000, 1712268000000, 1712354400000, 1714341600000,
                  1713823200000, 1713909600000, 1710111600000, 1710198000000,
                  1710370800000, 1710543600000, 1711062000000, 1709679600000,
                  1709334000000, 1711753200000, 1710630000000, 1709420400000,
                  1711494000000, 1711407600000, 1711321200000, 1710716400000,
                  1710802800000, 1710889200000, 1710975600000, 1711580400000,
                  1711148400000, 1711666800000, 1707174000000, 1707260400000,
                  1708383600000, 1708556400000, 1708642800000, 1708729200000,
                  1705273200000, 1705446000000,
                ],
              },
              "99f7b864-bf3d-42f2-86f1-ae81c2a1d59b": {
                color: "#5AC8FA",
                name: "Morning walk 30 min",
                notification: "",
                remind: false,
                repeat: "every-day",
                id: "99f7b864-bf3d-42f2-86f1-ae81c2a1d59b",
                datesArray: [
                  1727647200000, 1727733600000, 1727820000000, 1727906400000,
                  1727992800000, 1725487200000, 1726092000000, 1726696800000,
                  1727301600000, 1727215200000, 1726610400000, 1726005600000,
                  1725400800000, 1725919200000, 1726524000000, 1725228000000,
                  1726783200000, 1727474400000, 1726351200000, 1725660000000,
                  1726264800000, 1726178400000, 1723586400000, 1724191200000,
                  1724796000000, 1724882400000, 1724968800000, 1725055200000,
                  1724450400000, 1724364000000, 1723759200000, 1722463200000,
                  1722636000000, 1723932000000, 1722808800000, 1724104800000,
                  1724623200000, 1723068000000, 1721167200000, 1721772000000,
                  1722376800000, 1720476000000, 1722290400000, 1720994400000,
                  1720044000000, 1721340000000, 1722031200000, 1720908000000,
                  1722117600000, 1720216800000, 1720562400000, 1719784800000,
                  1718661600000, 1718229600000, 1719439200000, 1719525600000,
                  1718402400000, 1719698400000, 1717711200000, 1717365600000,
                  1719180000000, 1718143200000, 1717192800000, 1717624800000,
                  1714514400000, 1715724000000, 1715205600000, 1715896800000,
                  1715378400000, 1716674400000, 1714773600000, 1716415200000,
                  1716501600000, 1716588000000, 1715983200000, 1716328800000,
                  1716242400000, 1716156000000, 1715032800000, 1715119200000,
                  1717020000000, 1716933600000, 1716847200000, 1718920800000,
                  1718834400000, 1718748000000, 1719007200000, 1719093600000,
                  1718575200000, 1719266400000, 1719352800000, 1718316000000,
                  1718056800000, 1717970400000, 1717797600000, 1712527200000,
                  1712613600000, 1712786400000, 1712959200000, 1714168800000,
                  1713391200000, 1713996000000, 1713477600000, 1714255200000,
                  1712440800000, 1714428000000, 1713218400000, 1712095200000,
                  1712181600000, 1712268000000, 1712354400000, 1714341600000,
                  1713823200000, 1713909600000, 1710111600000, 1710198000000,
                  1710370800000, 1710543600000, 1711062000000, 1709679600000,
                  1709334000000, 1711753200000, 1710630000000, 1709420400000,
                  1711494000000, 1711407600000, 1711321200000, 1710716400000,
                  1710802800000, 1710889200000, 1710975600000, 1711580400000,
                  1711148400000, 1711666800000, 1707174000000, 1707260400000,
                  1708383600000, 1708556400000, 1708642800000, 1708729200000,
                  1705273200000, 1705446000000,
                ],
              },
            };
            const storedHabitsIDs = ["99f7b864-bf3d-42f2-86f1-ae81c2a1d59b","2e72625e-9f9d-4f09-a27b-070f4d45a691","68797eaa-1a9d-4f5d-97c8-a68d2617f0f1","77019ff4-a852-476f-9409-48129aad9d75"];
            if (storedHabitsIDs !== null && storedHabits !== null) {
                d(habitsActions.initializeHabits((storedHabits), (storedHabitsIDs)));
            }
        } catch (e) {
            console.error('Failed to load habits from storage', e);
        }
        d({ type: "SET_HABITS_INIT", payload: true });
    };

    // STEP 2: call those functions
    useEffect(() => {
        loadBase();
        loadHabits();
    }, []);

    // STEP 3: set i18n in with provider part of App
    useEffect(() => {
        const languagesList = Object.keys(LANG_MASKS);
        const userPreferredLanguages = getLocales().map(e => e.languageCode);

        // Function to get the first valid language from the list
        const getValidLanguage = (languages) => {
            for (const lang of languages) {
                if (languagesList.includes(lang)) {
                    return lang;
                }
            }
            return 'en'; // Default fallback language
        };

        // Determine the language to use
        let locale_set = lang; // lang = appReducer.lang

        if (!locale_set || !languagesList.includes(locale_set)) {
            locale_set = getValidLanguage([lang, ...userPreferredLanguages, 'en']);
            console.log(locale_set)
            d(appActions.setLang(locale_set));
        }

        if (i18n.locale !== locale_set) {
            i18n.locale = locale_set;
            i18n.changeLanguage(locale_set);
        }
    }, [lang]);


    // STEP 4: initialize system kind of theme (scheme)
    const payload = useColorScheme();
    const colorScheme = Appearance.getColorScheme();

    useEffect(() => {
        d(appActions.setSystemTheme(payload))
    }, [payload, colorScheme])

};

export default useInitializeAppDemo;
