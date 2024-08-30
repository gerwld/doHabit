import { updatePlanDaysIndexes } from "@/utils"

const initialState = {
 isInit: false,
 isEditMode: false,
 isDeleteMode: false,
 isCreatePlanMode: false,

 allPlans: null,
 currentObj: null,
 currentDays: null,
 currentPlanId: null,
 currentPlanName: "My Plan #1",
 currentDays: [],

 globalPlanId:  null,
 globalPlanname: null,
 startAtEpochDate: null,
 globalPlanCurrentDays: [],
}

export default function plans(state = initialState, action) {
 switch (action.type) {
  case 'INIT_PLANS':
    return {
      ...state,
      isInit: action.isInit
  }
  case 'SET_PLAN_INTERVAL':
    return {...state, 
      currentDays: action.payload
    }
  case 'SET_CURRENT_PLAN':
    return {...state,
      globalPlanId: action.id,
      globalPlanname: action.name,
      startAtEpochDate: action.startAtEpochDate,
      globalPlanCurrentDays: action.globalPlanCurrentDays
    }
    case 'SET_EDIT_PLAN':
    return {...state,
      currentPlanId: action.payload.id,
      currentPlanName: action.payload.name,
      currentDays: action.days
    }

    case 'SET_CURRENT_DAYS':
      return {...state,
        currentDays: action.payload
      }
  

  case 'ADD_PLANDAY':
    return {
      ...state,
      currentDays: [...state.currentDays, action.payload]
    }

  case 'DELETE_PLANDAY':
    let currentDaysFiltered = [...state.currentDays].filter(({id}) => id !== action.itemID);
    return {...state,
    currentDays: updatePlanDaysIndexes(currentDaysFiltered, 'planDayNumber')
  }
  case 'UPDATE_PLANDAY':
    return {...state,
    currentDays: [...state.currentDays.filter(({id}) => id !== action.payload.id), action.payload].sort((a,b) => a.planDayNumber - b.planDayNumber)
  }
  case 'SET_EDITMODE_PLAN': 
    return {...state,
      isEditMode: action.isEditMode,
      currentObj: action.currentObj
    }
  case 'CLOSE_EDIT_PLANDAY':
    return {...state,
      isEditMode: false,
      currentObj: null
  }
  case 'SET_CREATEMODE_PLAN': 
    return {...state,
      isCreatePlanMode: action.isCreatePlanMode,
    }
  case 'CREATE_PLAN': 
    return {...state,
      currentPlanId: state.currentPlanId ? state.currentPlanId : action.currentPlanId,
      isCreatePlanMode: action.isCreatePlanMode,
    }

  case 'SET_CREATEMODE_PLAN':
  return {...state,
    isCreatePlanMode: false
  }
  case 'CLOSE_CREATEMODE_PLAN':
    return {...state,
      newPlanId: null,
      isCreatePlanMode: false
  }

  case 'FETCH_PLANS':
    return {...state,
      allPlans: action.payload
    }
  default:
   return state
 }
}
