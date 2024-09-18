import { StyleSheet } from 'react-native';
import { getTheme } from "../constants";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT_SAFE = 55;

export const useHeaderStyles = (theme, isWhite = false) => {
  const insets = useSafeAreaInsets();
  const themeVars = getTheme(theme);

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
        height: HEADER_HEIGHT_SAFE,
        maxHeight: HEADER_HEIGHT_SAFE,
        minHeight: HEADER_HEIGHT_SAFE,
        flex: 1,
        flexDirection: 'row',
        alignItems: "flex-start",
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
      paddingLeft: 14,
      height: 55,
      justifyContent: "center",
        flex: 1,
    },
    rightComponent: {
      height: 55,
      justifyContent: "center",
      flex: 1,
      alignItems: 'flex-end',
  },
    centerComponent: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
 
    headerButton: {
      fontSize: 19,
      textAlign: "left",
      // lineHeight: HEADER_HEIGHT_SAFE,
      userSelect: "none",
      color: isWhite ? themeVars.textColorHighlight : "#ffffff",
    },
    headerButtonRight: {
      textAlign: "right",
      paddingRight: 14,
    }
});

  return headerStyles;
};
