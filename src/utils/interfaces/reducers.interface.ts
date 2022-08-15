export interface IAction {
  type: "ADD_FILTER" | "REMOVE_FILTER" | "CLEAR_FILTERS",
  data?: string,
}