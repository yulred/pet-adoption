import { createContext, useContext, useEffect, useState, useReducer } from "react";
import Cookies from "js-cookie";
import { Get } from "../utils/api";
import { IAuthContext, IAuthContextProps } from "../ts/interfaces/auth.interface";
import AuthReducer from "../reducers/AuthReducer";

const AuthContext = createContext<IAuthContext>({
  isLoading: true || false,
  isActiveSession: true || false,
  cookie: {},
  currentUser: {},
  handleAdoptPet: ()=>{},
  handleFosterPet: ()=>{},
  handleReturnPet: ()=>{},
  handleSavePet: ()=>{},
  handleClearSavedPet: ()=>{},
})

const AuthProvider = ({ children }: IAuthContextProps) => {
  const [currentUser, dispatchCurrentUser] = useReducer(AuthReducer, {});
  const [isLoading, setIsLoading] = useState(true);
  const [isActiveSession, setIsActiveSession] = useState(false);
  const cookie = Cookies.get();

  useEffect(() => {
    if (!isActiveSession && Object.keys(cookie).length > 0) {
      let userID = JSON.parse(atob(cookie.PetAdoption.split(".")[1])).id;
      setIsActiveSession(true);
      getCurrentUser(userID);
    } // eslint-disable-next-line
  }, [cookie])

  const getCurrentUser = async (userID: string) => {
    try {
      const res = await Get(`/user/${userID}`);
      setIsLoading(false);
      initCurrentUser(res);
    } catch(err: any) {
      console.log(err);
    }
  }

  const initCurrentUser = (user: object) => {
    dispatchCurrentUser({
      type: "INIT_USER",
      data: user,
    })
  }

  const handleAdoptPet = (petID: string) => {
    dispatchCurrentUser({
      type: "ADOPT_PET",
      data: petID,
    })
  }

  const handleFosterPet = (petID: string) => {
    dispatchCurrentUser({
      type: "FOSTER_PET",
      data: petID,
    })
  }

  const handleReturnPet = (petID: string) => {
    dispatchCurrentUser({
      type: "RETURN_PET",
      data: petID,
    })
  }

  const handleSavePet = (petID: string) => {
    dispatchCurrentUser({
      type: "SAVE_PET",
      data: petID,
    })
  }

  const handleClearSavedPet = (petID: string) => {
    dispatchCurrentUser({
      type: "CLEAR_SAVED_PET",
      data: petID,
    })
  }

  return (
    <AuthContext.Provider value={{ isLoading, isActiveSession, cookie, currentUser, handleAdoptPet, handleFosterPet, handleReturnPet, handleSavePet, handleClearSavedPet }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;