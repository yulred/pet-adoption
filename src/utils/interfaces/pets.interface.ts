export interface IPet {
  _id?: string,
  type?: string,
  name?: string,
  adoptionStatus?: string,
  picture?: string,
  height?: number,
  weight?: number,
  color?: string,
  bio?: string,
  hypoallergnic?: boolean,
  dietery?: string[],
  breed?: string,
}