import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

import { BaseView, SelectList, SettingsHeader } from '@components';
import { LANG_MASKS } from '@constants';

import { useTranslation } from 'react-i18next';
import { appActions } from "actions"
import { appSelectors } from '@redux';

const languagesList = Object.keys(LANG_MASKS).map(e => ({ name: LANG_MASKS[e], value: e }));

const STLanguage = ({ route, navigation }) => {
    const { t } = useTranslation();
    const d = useDispatch();
    const { lang, theme } = useSelector(appSelectors.selectAppThemeAndLang);
    const [state, setState] = React.useState({
        lang,
        ...route.params.state
    });

    const onChangeInput = useCallback((_, value) => {
        if (value !== undefined) {
            d(appActions.setLang(value))
        }
      }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            if (route.params?.onGoBack) {
                route.params.onGoBack({ data: { ...state } });
            }
            navigation.dispatch(e.data.action);
        });

        return unsubscribe;
    }, [navigation, route.params, state]);

    React.useEffect(() => {
        setState({ ...state, ...route.params.state });
    }, [route.params])

    return (

        <BaseView>
            <SettingsHeader
                navigation={navigation}
                theme={theme}
                title={t("st_lang")}
            />

            <View style={{ paddingTop: 14, flex: 1 }}>
                <SelectList
                    theme={theme}
                    style={{ flex: 1 }}
                    currentValue={lang}
                    withoutTranslate
                    setValue={(v) => onChangeInput('lang', v)}
                    data={languagesList}
                    title={t("int_lang")}
                />
            </View>

        </BaseView>
    )
}

export default STLanguage