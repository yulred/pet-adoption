import { ISearchAction } from "../utils/interfaces/reducers.interface";

export default function SearchReducer(state: Array<Array<string | undefined>>, action: ISearchAction) {
  switch(action.type) {
    case "ADD_FILTER":
      return [[action.payload, action.data], ...state.filter(item => item[1] !== action.data)];
    case "ADD_RANGE_FILTER":
      return [[action.payload, action.data], ...state.filter(item => item[0] !== action.payload)];
    case "ADD_QUERY_FILTER":
      return [[action.payload, action.data], ...state.filter(item => item[0] !== action.payload)];
    case "REMOVE_FILTER":
      state.splice(state.findIndex(item => item[1] === action.data), 1);
      
      return [...state];
    case "CLEAR_FILTERS":
      return [];
    default:
      throw new Error();
  }
}