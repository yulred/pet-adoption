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

export interface IUserColumn {
  name?: string,
  email?: string,
  role?: string,
  date?: string,
  id?: string,
}