import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next';

import { BaseView, SelectList, STHeader } from '@components';
import { REPEAT_MASKS } from '@constants';

const AHSRepeat = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [state, setState] = React.useState({
    ...route.params.state
  });
  const theme = route.params.theme
  

  const onChangeInput = useCallback((name, value) => {
    if (name && value !== undefined) {
      setState({ ...state, [name]: value })
    }
  }, [])

  const handleGoBack = () => {
    // Pass data back to ScreenA using the onGoBack callback
    route.params.onGoBack({ data: { ...state } });
    navigation.goBack();
  };

  React.useEffect(() => {
    setState({ ...state, ...route.params.state });
  }, [route.params])

  return (

    <BaseView>
      <STHeader
        bgColor={state.color}
        onGoBack={handleGoBack}
        navigation={navigation}
        theme={theme}
        title={t("addt_int_title")}
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