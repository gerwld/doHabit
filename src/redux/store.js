
import { configureStore } from "@reduxjs/toolkit"
import { habits, app } from "."

const store = configureStore({
    reducer: {
        app,
        habits,
    },
})

export default store
