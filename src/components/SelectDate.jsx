import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { getTimeFromTimestamp } from '@constants';

const SelectDate = ({ themeColors, value, onChangeInput, remind, isSelectTime, setSelectTime }) => {  
    const date = new Date();
    const {t} = useTranslation();
  
    const onTimeSelect = (_, payload) => {
      if(Platform.OS === "android") {
        setSelectTime(false)
      }
      const time = getTimeFromTimestamp(payload);
      if (time) {
        onChangeInput("remindTime", time);
      }
    }
  
    const height = useSharedValue(220);
  
    const animatedProps = useAnimatedStyle(() => ({
      height: height.value,
      overflow: 'hidden'
    }));
  
    React.useEffect(() => {
      const value = remind ? 220 : 0
      height.value = withTiming(value, {duration: 300})
    }, [remind])
  
    return (
      <Animated.View style={animatedProps}>
        {isSelectTime
          ? <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(300)}>
            <RNDateTimePicker
              style={{ backgroundColor: themeColors.bgHighlight, background: "red" }}
              positiveButton={{label: 'OK', textColor: themeColors.textColor}} 
              negativeButton={{label: t("act_cancel"), textColor: themeColors.textColor}} 
              is24Hour={uses24HourClock(date)}
              themeVariant={themeColors.label}
              onChange={onTimeSelect}
              timeZoneName={'GMT0'}
              value={new Date("2024-09-16T" + (value ? value + ":00.000Z" : `${DEFAULT_TIME}:00.000Z`))}
              mode="time"
              display="spinner"
            />
  
          </Animated.View>
          : null}
      </Animated.View>
    )
  }

  export default SelectDate;