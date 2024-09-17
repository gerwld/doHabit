import {
    SET_LANG,
    APP_INITIALIZE,
    SET_THEME,
    SET_THEME_SYSTEM
} from "actions/appActions";
import { produce } from "immer";

const initialState = {
    lang: null,
    theme: "st_theme__system",
    system_theme: null
}

export default function app(state = initialState, action) {
    return produce(state, draft => {
        switch (action.type) {
            case APP_INITIALIZE:
                Object.assign(draft, action.payload);
                break;
            case SET_LANG:
                // if(Object.keys(LANG_MASKS).filter(e => e === action.payload).length)
                draft.lang = action.payload;
                break;
            case SET_THEME:
                draft.theme = action.payload;
                break;
            case SET_THEME_SYSTEM:                
                draft.system_theme = action.payload;
                break;
            default:
                return state;
                break;
        }
    })
}