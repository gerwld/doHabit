
import { configureStore } from "@reduxjs/toolkit"

import { default as habits } from "./reducers/habitsReducer"
import { default as app } from "./reducers/appReducer"

const store = configureStore({
    reducer: {
        app,
        habits,
    },
})

export default store
