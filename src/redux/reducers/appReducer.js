import {
    SET_LANG,
    APP_INITIALIZE
} from "actions/appActions";

const initialState = {
    lang: "en"
}

export default function app(state = initialState, action) {
    switch (action.type) {
        case APP_INITIALIZE:
            console.log(action.payload)
            return {
                ...state,
                ...action.payload,
            }
            break;
        case SET_LANG:
            // if(Object.keys(LANG_MASKS).filter(e => e === action.payload).length)
                return { ...state, lang: action.payload }
            break;
        default:
            return state;
            break;
    }
}