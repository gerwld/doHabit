import React from "react";
import { useSelector } from "react-redux";

import { getTheme } from "@constants";
import { appSelectors } from "@redux";

export default function useCurrentTheme() {
    const theme = useSelector(appSelectors.selectAppTheme);
    const themeColors = getTheme(theme);
    return [themeColors, theme];
}