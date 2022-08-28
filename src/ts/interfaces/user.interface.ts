export interface IUser {
  _id?: string,
  name?: string,
  email?: string,
  tel?: string,
  bio?: number,
  role?: string,
  pets?: {
    adopted: string[],
    fostered: string[],
    saved: string[],
  },
  createdAt: string,
  updatedAt: string,
}

export interface IUsers {
  users?: {
    _id: string,
    name: string,
    email: string,
    tel: string,
    bio: number,
    role: string,
    pets: {
      adopted: string[],
      fostered: string[],
      saved: string[],
    },
    createdAt: string,
    updatedAt: string,
  }[],
}

export interface IColumn {
  name: string | undefined,
  email: string | undefined,
  tel: string | undefined,
  role: string | undefined,
  id: string | undefined,
}