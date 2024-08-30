let initialState = {
  isInit: true,
  runDistance: null,
  currentRange: [],
  statsData: null
}

export default function statistics(state = initialState, action) {
 switch (action.type) {
  case 'SET_STATS_INIT':
    return {
      ...state,
      isInit: action.payload
    }
  case 'SET_STATS':
    return {
      ...state,
      runDistance: action.payload
    }
  case 'SET_STATS_RANGE':
    return {
      ...state,
      currentRange: action.payload
    }
  case 'SET_STATS_GLOB':
    return {
      ...state,
      statsData: action.payload,
      totalDistance: action.totalDistance,
      avgWeight: action.avgWeight,
    }
  default:
   return state
 }
}
