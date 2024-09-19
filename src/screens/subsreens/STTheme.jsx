import React from 'react'
import { View, LogBox } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import { BaseView, SelectList, STHeader } from '@components';
import { THEMES_MASKS } from '@constants';

import { useTranslation } from 'react-i18next';
import { appActions } from "actions"
import { appSelectors } from '@redux';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const STTheme = (({ navigation }) => {  
    
    const {t} = useTranslation();
    const d = useDispatch();
    const theme = useSelector(appSelectors.selectAppTheme);

    const onChangeInput = (name, value) => {
        d(appActions.setTheme(value))        
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (

        <BaseView>
           <STHeader
                navigation={navigation}
                title={t("st_theme")}
            />

            <View style={{ paddingTop: 14, flex: 1 }}>
                <SelectList
                    showFetch
                    theme={theme}
                    style={{ flex: 1 }}
                    currentValue={theme.theme}
                    setValue={(v) => onChangeInput('theme', v)}
                    data={Object.keys(THEMES_MASKS).map(e => ({ name: THEMES_MASKS[e], value: e }))}
                    title={t("int_theme")}
                />
            </View>

        </BaseView>
    )
});



export default STTheme