const THEMES_MASKS = {
    "st_theme__light": "Light",
    "st_theme__dark": "Dark",
    "st_theme__system": "System",
}

const REPEAT_MASKS = {
    "every-day": "Every Day",
    "every-week": "Every Week",
    "3-times-week": "3 times per week",
    "5-times-week": "5 times per week",
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

module.exports = {
    THEMES_MASKS, REPEAT_MASKS, HABIT_COLORS, getRandomItem
}