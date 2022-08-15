import { IAction } from "../utils/interfaces/reducers.interface";

export default function SearchReducer(state: string[], action: IAction) {
  switch(action.type) {
    case "ADD_FILTER":
      return [action.data as string, ...state.filter(item => item !== action.data)];
    case "REMOVE_FILTER":
      state.splice(state.indexOf(action.data as string), 1);
      return [...state];
    case "CLEAR_FILTERS":
      return [];
    default:
      throw new Error();
  }
}