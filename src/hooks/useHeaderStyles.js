import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useCurrentTheme from './useCurrentTheme';
import { PLATFORM } from '@constants';

const getRatioExtras = () => {
  if(PLATFORM === "android") return 0.016
  return 0
}

const GAP_BETWEEN_SCREEN_BORDERS = 14;

export const useHeaderStyles = (theme, isWhite = false) => {
  const themeColors = useCurrentTheme();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const HEADER_HEIGHT_SAFE = PLATFORM === "web" ? 55: 60;
  const HEADER_HEIGHT_EXTRAS = Math.min(height * getRatioExtras(), 20);
  const INSET_SAFE = PLATFORM === "ios" && insets.top < 21 ? insets.top - 1 : insets.top;
  const BUTTON_DIMENSIONS = Math.floor(Math.min(width * 0.24, 120));

  const headerStyles = StyleSheet.create({
    header: {
      width: "100%",
      height: INSET_SAFE + HEADER_HEIGHT_SAFE + HEADER_HEIGHT_EXTRAS,
      maxHeight: INSET_SAFE + HEADER_HEIGHT_SAFE + HEADER_HEIGHT_EXTRAS,
      minHeight: INSET_SAFE + HEADER_HEIGHT_SAFE + HEADER_HEIGHT_EXTRAS,
      padding: 0,
      alignItems: "center",
      justifyContent: "flex-end",
      borderBottomWidth: 0,
    },
    headerContent: {
      width: "100%",
      flex: 1,
      height: HEADER_HEIGHT_SAFE,
      maxHeight: HEADER_HEIGHT_SAFE,
      minHeight: HEADER_HEIGHT_SAFE,

      flexDirection: 'row',
      alignItems: "space-between",
      justifyContent: 'space-between',
      paddingHorizontal: 2,
    },
    headerButton: {
      flexShrink: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: HEADER_HEIGHT_SAFE,
      width: 55,
    },
    headerTitle: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',

    },
    centerComponent: {
      height: HEADER_HEIGHT_SAFE,
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: width - (BUTTON_DIMENSIONS * 2),
      paddingHorizontal: 2,
      flex: 1,
    },

    leftComponent: {
      height: HEADER_HEIGHT_SAFE,
      justifyContent: "center",
      minWidth: BUTTON_DIMENSIONS,
      maxWidth: BUTTON_DIMENSIONS,
    },
    rightComponent: {
      height: HEADER_HEIGHT_SAFE,
      justifyContent: "center",
      alignItems: 'flex-end',
      minWidth: BUTTON_DIMENSIONS,
      maxWidth: BUTTON_DIMENSIONS,
    },

    componentPressable: {
      alignSelf: "flex-start",
      paddingLeft: GAP_BETWEEN_SCREEN_BORDERS,
      paddingRight: 4,
      justifyContent: "center",
      height: HEADER_HEIGHT_SAFE,
    },
    componentPressableRight: {
      alignSelf: "flex-end",
      paddingRight: GAP_BETWEEN_SCREEN_BORDERS,
      paddingLeft: 4,
    },

    headerButton: {
      fontSize: 19,
      maxWidth: BUTTON_DIMENSIONS,
      lineHeight: HEADER_HEIGHT_SAFE,
      userSelect: "none",
      textAlign: "left",
      color: isWhite ? themeColors.textColorHighlight : "#ffffff",

    },
  });

  return {
    headerStyles,
    HEADER_HEIGHT_SAFE,
    HEADER_HEIGHT_EXTRAS,
    INSET_SAFE
  };
};
