export interface ISessionContext {
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
    }
  },
}

export interface ISessionContextProps {
  children: React.ReactNode,
}