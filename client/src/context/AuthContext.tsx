import { createContext, useContext, useEffect, useState, useReducer } from "react";
import { Get } from "../utils/api";
import { IAuthContext } from "../ts/interfaces/auth.interface";
import AuthReducer from "../reducers/AuthReducer";

const AuthContext = createContext<IAuthContext>({
  isLoading: true,
  isActiveSession: false,
  currentUser: {},
  getCurrentUser: ()=>{},
  clearCurrentUser: ()=>{},
  handleAdoptPet: ()=>{},
  handleFosterPet: ()=>{},
  handleReturnPet: ()=>{},
  handleSavePet: ()=>{},
  handleClearSavedPet: ()=>{},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, dispatchCurrentUser] = useReducer(AuthReducer, {});
  const [isLoading, setIsLoading] = useState(true);
  const [isActiveSession, setIsActiveSession] = useState(false);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const awaitVerifyUser = async () => await verifyUser();
    awaitVerifyUser(); // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const awaitGetCurrentUser = async (userID: string) => await getCurrentUser(userID);
    if (userID) awaitGetCurrentUser(userID); // eslint-disable-next-line
  }, [userID])

  const verifyUser = async () => {
    try {
      const res = await Get("");
      if (res.ok) setUserID(res.id);
    } catch(err: any) {
      if (err.response.status === 401) {
        initCurrentUser({});
        setIsActiveSession(false);
      } else console.log(err);
    }
  }

  const getCurrentUser = async (userID: string) => {
    try {
      setIsLoading(true);
      const res = await Get(`/user/${userID}`);
      initCurrentUser(res);
      setIsLoading(false);
      setIsActiveSession(true);
    } catch(err) {
      console.log(err);
    }
  }

  const clearCurrentUser = async () => {
    initCurrentUser({});
    setIsActiveSession(false);
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
    <AuthContext.Provider value={{ isLoading, isActiveSession, currentUser, getCurrentUser, clearCurrentUser, handleAdoptPet, handleFosterPet, handleReturnPet, handleSavePet, handleClearSavedPet }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;