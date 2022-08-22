export interface ISessionContext {
  isActiveSession: boolean
  cookie: object,
  currentUser: {
    _id?: string,
    name?: string,
    email?: string,
    tel?: string,
    bio?: string,
  },
}

export interface ISessionContextProps {
  children: React.ReactNode,
}