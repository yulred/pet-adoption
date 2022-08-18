export interface ISearchBar {
  getSearchResults: Function,
}

export interface ISearchFilterRange {
  filter: string,
}

export interface ISearchFilterTag {
  item: string[],
}

export interface ISearchResults {
  searchResults: object[],
}

export interface ISearchResultsCard {
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
    hypoallergnic?: boolean,
    dietery?: string[],
    breed?: string,
  },
}

export interface ISearchContext {
  filters: Array<Array<string | undefined>>,
  handleAddFilter: Function,
  handleAddRangeFilter: Function,
  handleAddQueryFilter: Function,
  handleRemoveFilter: Function,
  handleClearFilters: Function,
  advancedSearch: boolean,
  toggleAdvancedSearch: Function,
}

export interface ISearchContextProps {
  children: React.ReactNode,
}