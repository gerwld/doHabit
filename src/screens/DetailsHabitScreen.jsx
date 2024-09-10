import React from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import { Header as HeaderRNE } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { BaseView } from '@components';
import alert from '../polyfils/alert';
import { habitsActions } from "actions";
import { REPEAT_MASKS } from '@constants';
import { useHeaderStyles } from 'hooks';
import { Label, InfoBar, InfoBarItem } from "styles/crudtask"


const DetailsHabitScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const d = useDispatch();

  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    setItem(route.params);
  }, [route.params])

  const theme = route?.params?.theme
  const headerStyles = useHeaderStyles(theme);

  const onPressDeleteHabit = () => {
    const onConfirm = () => {
      d(habitsActions.delHabit(item.id));
      navigation.navigate("home");
    }

    alert(
      `Delete "${item.name}"?`,
      "This action can't be undone.",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: onConfirm
        }
      ],
      {
        cancelable: true,
        onDismiss: () => console.log("ok")
      })
  }




  return (

    <BaseView>
      <HeaderRNE
        containerStyle={headerStyles.header}
        style={{ height: 60 }}
        leftComponent={
          <TouchableOpacity  onPress={() => navigation.navigate('home')}>
              <Text style={headerStyles.headerButton}>{t("act_cancel")}</Text>
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate("edithabit", item)}>
              <Text style={{...headerStyles.headerButton, ...headerStyles.headerButtonRight}}>Edit</Text>
          </TouchableOpacity>
        }
        centerComponent={<Text numberOfLines={1} ellipsizeMode='tail' style={headerStyles.headerTitle}>{item?.name}</Text>}
        backgroundColor={item?.color ? item.color : "#5fb1e7"}
      />


      <View style={{ paddingTop: 14, flex: 1 }}>

        <InfoBar>
          <InfoBarItem>
            <Text>{item?.repeat ? REPEAT_MASKS[item.repeat] : "-"}</Text>
          </InfoBarItem>
          <InfoBarItem>
            <Text>--:--</Text>
          </InfoBarItem>
        </InfoBar>



        <Label>{t("label_ov")}</Label>
        <Label>{t("label_hits")}</Label>
        <Label>{t("label_stre")}</Label>

        <InfoBar>
          <Button
            onPress={onPressDeleteHabit}
            title={t('act_delete')}
          />
        </InfoBar>

      </View>
    </BaseView>
  )
}

export default DetailsHabitScreen