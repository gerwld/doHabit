import { configureStore } from "@reduxjs/toolkit"
import { statistics, plans } from "."

const store = configureStore({
    reducer: {
        statistics,
        plans
    },
})

export default store
