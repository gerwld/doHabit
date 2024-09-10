import { StyleSheet } from 'react-native';
import { getTheme } from "../constants";

export const useHeaderStyles = (theme, isWhite = false) => {
  const themeVars = getTheme(theme);

  const headerStyles = StyleSheet.create({
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    header: {
      justifyContent: "space-between",
      padding: 0,
      minHeight: 55,
      paddingVertical: 0,
      paddingHorizontal: 0,
      border: "none",
      flexDirection: "row",
      borderBottomColor: themeVars.borderColor,
    },
    headerTitle: {
      maxWidth: 260,
      minHeight: 55,
      lineHeight: 55,
      flex: 1,
      color: isWhite ? themeVars.textColorHighlight : "#ffffff",
      textAlign: "center",
      fontSize: 19,
      fontWeight: 'bold',
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      userSelect: "none",
    },
  
    headerButton: {
      textAlign: "left",
      width: 108,
      flex: 2,
      maxHeight: 55,
      maxWidth: 140,
      fontSize: 18,
      height: 55,
      lineHeight: 55,
      paddingLeft: 14,
      color: isWhite ? themeVars.textColorHighlight : "#ffffff",
    },
    headerButtonRight: {
      textAlign: "right",
      paddingRight: 14,
    }
  });

  return headerStyles;
};
