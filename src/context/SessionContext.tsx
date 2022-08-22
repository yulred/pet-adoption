import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Get } from "../utils/api";
import { ISessionContext, ISessionContextProps } from "../utils/interfaces/session.interface";

const SessionContext = createContext<ISessionContext>({
  isActiveSession: true || false,
  cookie: {},
  currentUser: {},
})

const SessionProvider = ({ children }: ISessionContextProps) => {
  const [isActiveSession, setIsActiveSession] = useState(false);
  const [currentUser, setCurrentUser] = useState<ISessionContext["currentUser"]>({});
  const cookie = Cookies.get();

   useEffect(() => {
    if (!isActiveSession && Object.keys(cookie).length > 0) {
      let userID = cookie.PetAdoption.split("%")[0];
      setIsActiveSession(true);
      getCurrentUser(userID);
    }
  }, [cookie])

  const getCurrentUser = async (userID: string) => {
    try {
      const res = await Get(`/user/${userID}`);
      setCurrentUser(res);
    } catch(err: any) {
      console.log(err);
    }
  }

  return (
    <SessionContext.Provider value={{ isActiveSession, cookie, currentUser }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSessionContext = () => useContext(SessionContext);

export default SessionProvider;