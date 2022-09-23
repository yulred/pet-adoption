export interface IAuthContext {
  isLoading: boolean,
  isActiveSession: boolean,
  currentUser: {
    _id?: string,
    name?: string,
    email?: string,
    tel?: string,
    bio?: string,
    pets?: {
      adopted?: string[],
      fostered?: string[],
      saved?: string[],
    },
    role?: string,
  },
  getCurrentUser: Function,
  clearCurrentUser: Function,
  handleAdoptPet: Function,
  handleFosterPet: Function,
  handleReturnPet: Function,
  handleSavePet: Function,
  handleClearSavedPet: Function,
}