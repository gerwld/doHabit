import React from 'react'
import { View, Text, Pressable, LogBox } from 'react-native'
import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';

import { BaseView, SelectList } from '@components';
import { THEMES_MASKS, getTheme } from '@constants';

import { useTranslation } from 'react-i18next';
import { appActions } from "actions"
import { useHeaderStyles } from 'hooks';
import { appSelectors } from '@redux';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const STTheme = ({ route, navigation }) => {
    const {t} = useTranslation();
    const d = useDispatch();
    const theme = useSelector(appSelectors.selectAppTheme);
    const [state, setState] = React.useState({
        theme,
        ...route.params.state
    });
    const headerStyles = useHeaderStyles(theme, isWhite = true);

    const onChangeInput = (name, value) => {
        d(appActions.setTheme(value))
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
                    currentValue={theme}
                    setValue={(v) => onChangeInput('theme', v)}
                    data={Object.keys(THEMES_MASKS).map(e => ({ name: THEMES_MASKS[e], value: e }))}
                    title={t("int_theme")}
                />
            </View>

        </BaseView>
    )
}



export default STTheme