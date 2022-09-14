import { ActionModel } from './model/action.model'
import { StateModel } from './model/state.model'

const initState: StateModel = {
  extraTime: 0
}

export enum StateAction {
  SET_EXTRA_TIME
}

export const reducer = (state: StateModel = initState, action: ActionModel): StateModel => {
  switch (action.type) {
    case StateAction.SET_EXTRA_TIME:
      return { ...state, extraTime: action.data }
    default:
      return state
  }
}
