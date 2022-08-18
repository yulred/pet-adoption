export interface IAction {
  type: "ADD_FILTER" | "ADD_RANGE_FILTER" | "ADD_QUERY_FILTER" | "REMOVE_FILTER" | "CLEAR_FILTERS",
  data?: string,
  payload?: string,
}