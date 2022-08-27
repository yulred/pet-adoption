export interface IAuthContext {
  isLoading: boolean,
  isActiveSession: boolean
  cookie: object,
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
  handleAdoptPet: Function,
  handleFosterPet: Function,
  handleReturnPet: Function,
  handleSavePet: Function,
  handleClearSavedPet: Function,
}

export interface IAuthContextProps {
  children: React.ReactNode,
}