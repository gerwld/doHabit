import { configureStore } from "@reduxjs/toolkit"
import { habbits } from "."

const store = configureStore({
    reducer: {
        habbits,
    },
})

export default store
