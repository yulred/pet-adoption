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
}

export interface IPetStatus {
  pet?: {
    _id?: string,
    adoptionStatus?: string,
  },
  updatePetStatus: Function,
}

export interface IPetButton {
  icon: any,
  action: Function,
  label: string,
}

export interface IPetCard {
  pet: {
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
  },
  cardSize: string,
}

export interface IPets {
  ownedPets: object[],
  savedPets: object[],
}

export interface IPetGrid {
  cardSize: string,
  petsArray: IPet[],
  emptyArrayMsg: string,
}

export interface IPetColumn {
  name: string | undefined,
  type: string | undefined,
  status: string | undefined,
  id: string | undefined,
}