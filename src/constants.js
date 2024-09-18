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
        borderColor: "#e5e5ea",
        textColor: "#50677a",
        textColorHighlight: "#000",
        textColorRevert: "#fff",
        crossSymb: "#a5bbd3",
        thumbBackground: "#e5e5ea",
        thumbBackgroundIos: "#ffffff",
    },
    "st_theme__dark": {
        label: "dark",
        background: "#000000",
        bgHighlight: "#242424",
        borderColor: "#000",
        textColor: "#c0cdd9",
        textColorHighlight: "#fff",
        textColorRevert: "#fff",
        crossSymb: "#45474b",
        thumbBackground: "#45474b",
        thumbBackgroundIos: "#45474b",
    }
}

const REPEAT_MASKS = {
    "every-day": "Every Day",
    "every-week": "Every Week",
    "3-times-week": "3 times per week",
    "5-times-week": "5 times per week",
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
    THEMES_MASKS,
    REPEAT_MASKS,
    LANG_MASKS,
    HABIT_COLORS,
    THEMEV,
    getRandomItem,
    getTheme,
    getThemeStatusBar,
    getTimeFromTimestamp,
    uses24HourClock,
    convertTo12HourFormat
}