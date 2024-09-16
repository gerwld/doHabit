const THEMES_MASKS = {
    "st_theme__light": "Light",
    "st_theme__dark": "Dark",
    "st_theme__system": "System",
}

const THEMEV = {
    "st_theme__light": {
        background: "#f0f2f7",
        bgHighlight: "#ffffff",
        borderColor: "#e5e5ea",
        textColor: "#50677a",
        textColorHighlight: "#000",
        textColorRevert: "#fff",
        crossSymb: "#a5bbd3",
        thumbBackground: "#eff2f3"
    },
    "st_theme__dark": {
        background: "#000000",
        bgHighlight: "#242424",
        borderColor: "#000",
        textColor: "#c0cdd9",
        textColorHighlight: "#fff",
        textColorRevert: "#fff",
        crossSymb: "#45474b",
        thumbBackground: "#45474b"
    }
}

const REPEAT_MASKS = {
    "every-day": "Every Day",
    "every-week": "Every Week",
    "3-times-week": "3 times per week",
    "5-times-week": "5 times per week",
}

const LANG_MASKS = {
    "en": "English",
    "pl": "Polish",
    "uk": "Ukrainian",
}

const HABIT_COLORS = [
    '#FF9500', // Orange
    '#FFCC00', // Yellow
    '#34C759', // Green
    '#5AC8FA', // Teal
    '#007AFF', // Blue
    '#AF52DE', // Purple
    '#FF2D55', // Pink
    '#69dd91',  // Green
    '#e34234' // Brown
];

const getRandomItem = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

const getTheme = (theme) => {
    if (theme === "st_theme__dark") return THEMEV["st_theme__dark"]
    if (theme === "st_theme__light") return THEMEV["st_theme__light"]
    return THEMEV["st_theme__light"]
}

const getThemeStatusBar = (theme, isReversed) => {
    if (isReversed) switch (theme) {
        case "st_theme__dark":
            return "light-content"
        case "st_theme__light":
            return "dark-content"
        default:
            return "dark-content"
    }

    else switch (theme) {
        case "st_theme__dark":
            return "dark-content"
        case "st_theme__light":
            return "light-content"
        default:
            return "light-content"
    }
}

module.exports = {
    THEMES_MASKS, REPEAT_MASKS, LANG_MASKS, HABIT_COLORS, THEMEV, getRandomItem, getTheme, getThemeStatusBar
}