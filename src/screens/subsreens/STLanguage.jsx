import React from 'react'
import { View, Text, LogBox, Pressable } from 'react-native'
import { Header as HeaderRNE } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';

import { BaseView, SelectList } from '@components';
import { LANG_MASKS, getTheme } from '@constants';

import { useTranslation } from 'react-i18next';
import { appActions } from "actions"
import { useHeaderStyles } from 'hooks';
import { appSelectors } from '@redux';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const STLanguage = ({ route, navigation }) => {
    const { t } = useTranslation();
    const d = useDispatch();
    const { lang, theme } = useSelector(appSelectors.selectAppThemeAndLang);
    const [state, setState] = React.useState({
        lang,
        ...route.params.state
    });
    const headerStyles = useHeaderStyles(theme, isWhite = true);

    const onChangeInput = (name, value) => {
        d(appActions.setLang(value))
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

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
            <HeaderRNE
                containerStyle={headerStyles.header}
                style={{ height: 60 }}
                leftComponent={
                    <Pressable onPress={handleGoBack}>
                        <Text style={headerStyles.headerButton}>{t("act_back")}</Text>
                    </Pressable>
                }

                centerComponent={<Text style={headerStyles.headerTitle}>{t("st_theme")}</Text>}
                backgroundColor={getTheme(theme).bgHighlight}
            />

            <View style={{ paddingTop: 14, flex: 1 }}>
                <SelectList
                    theme={theme}
                    style={{ flex: 1 }}
                    currentValue={lang}
                    withoutTranslate
                    setValue={(v) => onChangeInput('lang', v)}
                    data={Object.keys(LANG_MASKS).map(e => ({ name: LANG_MASKS[e], value: e }))}
                    title={t("int_lang")}
                />
            </View>

        </BaseView>
    )
}

export default STLanguage