import { IAuthAction, IAuthState } from "../ts/interfaces/reducers.interface";

export default function SearchReducer(state: IAuthState, action: IAuthAction): any {
  switch(action.type) {
    case "INIT_USER":
      return {...action.data as IAuthState};
    case "ADOPT_PET":
      return {...state, pets: {
        adopted: [...state.pets.adopted.filter(item => item !== action.data), action.data],
        fostered: [...state.pets.fostered],
        saved: [...state.pets.saved],
      }}
    case "FOSTER_PET":
      return {...state, pets: {
        fostered: [...state.pets.fostered.filter(item => item !== action.data), action.data],
        adopted: [...state.pets.adopted],
        saved: [...state.pets.saved],
      }}
    case "RETURN_PET":
      state.pets.adopted.splice(state.pets.adopted.findIndex(item => item === action.data), 1);
      state.pets.fostered.splice(state.pets.fostered.findIndex(item => item === action.data), 1);

      return {...state, pets: {
        adopted: [...state.pets.adopted],
        fostered: [...state.pets.fostered],
        saved: [...state.pets.saved],
      }}
    case "SAVE_PET":
      return {...state, pets: {
        saved: [...state.pets.saved.filter(item => item !== action.data), action.data],
        adopted: [...state.pets.adopted],
        fostered: [...state.pets.fostered],
      }}
    case "CLEAR_SAVED_PET":
      state.pets.saved.splice(state.pets.saved.findIndex(item => item === action.data), 1);

      return {...state, pets: {
        saved: [...state.pets.saved],
        adopted: [...state.pets.adopted],
        fostered: [...state.pets.fostered],
      }}
    default:
      throw new Error();
  }
}