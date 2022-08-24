export interface ISearchAction {
  type: "ADD_FILTER" | "ADD_RANGE_FILTER" | "ADD_QUERY_FILTER" | "REMOVE_FILTER" | "CLEAR_FILTERS",
  data?: string,
  payload?: string,
}

export interface IAuthState {
  _id: string,
  name: string,
  email: string,
  tel?: string,
  bio?: string,
  pets: {
    adopted: (string | object | undefined)[],
    fostered: (string | object | undefined)[],
    saved: (string | object | undefined)[],
  },
}

export interface IAuthAction {
  type: "INIT_USER" | "ADOPT_PET" | "FOSTER_PET" | "RETURN_PET" | "SAVE_PET" | "CLEAR_SAVED_PET",
  data?: object | string,
}