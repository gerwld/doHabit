
import { configureStore } from "@reduxjs/toolkit"
import { habits } from "."

const store = configureStore({
    reducer: {
        habits,
    },
})

export default store
