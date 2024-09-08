import React from 'react'
import { View, Text, TouchableOpacity, LogBox } from 'react-native'
import { Header as HeaderRNE } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import { BaseView, SelectList } from '@components';
import { REPEAT_MASKS } from '@constants';
import { useHeaderStyles } from 'hooks';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


const AHSRepeat = ({ route, navigation }) => {
  const { t } = useTranslation();
  const headerStyles = useHeaderStyles(route.params.theme);

  const [state, setState] = React.useState({
    ...route.params.state
  });

  const theme = route.params.theme

  const onChangeInput = (name, value) => {
    if (name && value !== undefined) {
      setState({ ...state, [name]: value })
    }
  }

  const handleGoBack = () => {
    // Pass data back to ScreenA using the onGoBack callback
    route.params.onGoBack({ data: { ...state } });
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
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={headerStyles.headerButton}>{t("act_back")}</Text>
          </TouchableOpacity>
        }

        centerComponent={<Text style={headerStyles.headerTitle}>{t("addt_int_title")}</Text>}
        backgroundColor={state.color}
      />

      <View style={{ paddingTop: 14, flex: 1 }}>
        <SelectList
          theme={theme}
          style={{ flex: 1 }}
          currentValue={state.repeat}
          color={state.color}
          setValue={(v) => onChangeInput('repeat', v)}
          data={Object.keys(REPEAT_MASKS).map(e => ({ name: REPEAT_MASKS[e], value: e }))}
          title={t('label_reg')}
        />
      </View>


    </BaseView>
  )
}

export default AHSRepeat