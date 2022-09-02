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
  hypoallergenic?: boolean,
  dietary?: string[],
  breed?: string,
  createdAt?: string,
}

export interface IPetButton {
  icon: any,
  action: Function,
  label: string,
}

export interface IPets {
  ownedPets: IPet[],
  savedPets: IPet[],
}

export interface IPetGrid {
  cardSize: number,
  petsArray: IPet[],
  emptyArrayMsg: string | null,
}

export interface IPetColumn {
  name?: string,
  type?: string,
  status?: string,
  date?: string,
  id?: string,
}

export interface IPetImage {
  imageSrc?: string,
  imageAlt?: string,
  imageSize: number,
  imageRadius: number,
}