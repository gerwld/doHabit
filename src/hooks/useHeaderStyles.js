import { StyleSheet } from 'react-native';
import { getTheme } from "../constants";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';

const HEADER_HEIGHT_SAFE = 55;
const GAP_BETWEEN_SCREEN_BORDERS = "9%";

export const useHeaderStyles = (theme, isWhite = false) => {
  const insets = useSafeAreaInsets();
  const themeColors = React.useMemo(() => getTheme(theme), [theme]);

  

  const headerStyles = StyleSheet.create({
    header: {
      width: "100%",
      height: insets.top + HEADER_HEIGHT_SAFE,
      maxHeight: insets.top + HEADER_HEIGHT_SAFE,
      minHeight: insets.top + HEADER_HEIGHT_SAFE,
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
      height: 55,
      width: 55,
    },
    headerTitle: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },

    leftComponent: {
      flex: 1,
      height: 55,
      justifyContent: "center",
    },
    rightComponent: {
      flex: 1,
      height: 55,
      justifyContent: "center",
      alignItems: 'flex-end',
    },
    centerComponent: {
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
    },

    componentPressable: {
      alignSelf: "flex-start",
      paddingLeft: GAP_BETWEEN_SCREEN_BORDERS,
      paddingRight: 4,
      justifyContent: "center",
      height: 55,
    },
    componentPressableRight: {
      alignSelf: "flex-end",
      paddingRight: GAP_BETWEEN_SCREEN_BORDERS,
      paddingLeft: 4,
    },

    headerButton: {
      fontSize: 19,
      maxWidth: 80,
      lineHeight: HEADER_HEIGHT_SAFE,
      userSelect: "none",
      textAlign: "left",
      color: isWhite ? themeColors.textColorHighlight : "#ffffff",

    },
  });

  return headerStyles;
};
