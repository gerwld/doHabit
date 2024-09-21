const { StyleSheet } = require("react-native")

const THEMES_MASKS = {
    "st_theme__light": "Light",
    "st_theme__dark": "Dark",
    "st_theme__system": "System",
}

const THEMEV = {
    "st_theme__light": {
        label: "light",
        background: "#f0f2f7",
        bgHighlight: "#ffffff",
        bgHighlightSec: "#f7f8fc",
        borderColor: "#ebeef4",
        textColor: "#50677a",
        textColorHighlight: "#000",
        textColorRevert: "#fff",
        crossSymb: "#c3ccdb",
        crossSymbL: "#e0e5ee",
        thumbBackground: "#e5e5ea",
        thumbBackgroundIos: "#ffffff",
        copyright: "#c3c7d3",
        chevron: "#b3b7c1",
        chevronText:"#a8adb8", 
    },
    "st_theme__dark": {
        label: "dark",
        background: "#000000",
        bgHighlight: "#1c1c21",
        bgHighlightSec: "#26262e",
        borderColor: "#000",
        textColor: "#c0cdd9",
        textColorHighlight: "#fff",
        textColorRevert: "#fff",
        crossSymb: "#45474b",
        crossSymbL: "#484b50",
        thumbBackground: "#45474b",
        thumbBackgroundIos: "#45474b",
        chevron: "#888c95",
        chevronText:"#ccd1db",
    }
}

const REPEAT_MASKS = {
    "every-day": "Every Day",
    "every-week": "Every Week",
    "3-times-week": "3 times per week",
    "5-times-week": "5 times per week",
}

const REPEAT_GAP_VALUES = {
    "every-day": {
        "month_repeat_days": 30,        // day_percent * month_repeat_days = 100%
        "gratitude_percent": 100 / 30,  // % score for extra days
        "day_percent": 100 / 30,        // score for specified days
        "reset_delay": 1,               // when score resets
    },
    "every-week": {
        "month_repeat_days": 4,
        "gratitude_percent": 100 / (4 * 0.1),
        "day_percent": 100 / 4,
        "reset_delay": 12,
    },
    "3-times-week": {
        "month_repeat_days": 12,
        "gratitude_percent": 100 / (12 * 0.3),
        "day_percent": 100 / 12,
        "reset_delay": 4,
    },
    "5-times-week": {
        "month_repeat_days": 20,
        "gratitude_percent": 100 / (20 * 0.3),
        "day_percent": 100 / 20,
        "reset_delay": 2,
    },
}

const LANG_MASKS = {
    "en": {
        orig: "English",
        mask: "English"
    },
    "pl": {
        orig: "Polish",
        mask: "Polski"
    },
    "uk": {
        orig: "Ukrainian",
        mask: "Українська"
    },
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

const getTheme = (th) => {
    const theme = th?.theme;
    const system_theme = th?.system_theme;
    if (theme === "st_theme__dark") return THEMEV["st_theme__dark"]
    if (theme === "st_theme__light") return THEMEV["st_theme__light"]
    if (theme === "st_theme__system") {
        if (system_theme === "dark") return THEMEV["st_theme__dark"]
        else return THEMEV["st_theme__light"]
    }
    return THEMEV["st_theme__light"]
}

const getThemeStatusBar = (th, isReversed) => {
    const theme = getTheme(th).label;
    if (isReversed) switch (theme) {
        case "dark":
            return "light-content"
        case "light":
            return "dark-content"
        default:
            return "dark-content"
    }

    else switch (theme) {
        case "dark":
            return "dark-content"
        case "light":
            return "light-content"
        default:
            return "light-content"
    }
}

function getTimeFromTimestamp(timestamp) {
    const date = new Date(timestamp);

    // Extract hours and minutes
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 hour to 12
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

const uses24HourClock = (date) => {
    const timeString = date.toLocaleTimeString([], { hour: 'numeric' });
    return !timeString.includes('AM') && !timeString.includes('PM');
};

module.exports = {
    LANG_MASKS,
    THEMES_MASKS,

    REPEAT_MASKS,
    REPEAT_GAP_VALUES,
    
    HABIT_COLORS,
    THEMEV,
    getRandomItem,
    getTheme,
    getThemeStatusBar,
    getTimeFromTimestamp,
    uses24HourClock,
    convertTo12HourFormat
}