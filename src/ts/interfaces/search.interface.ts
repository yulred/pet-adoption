export interface ISearchBar {
  getSearchResults: Function,
  isSearching: boolean,
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

export interface ISearchContext {
  filters: (string | undefined)[][],
  handleAddFilter: Function,
  handleAddRangeFilter: Function,
  handleAddQueryFilter: Function,
  handleRemoveFilter: Function,
  handleClearFilters: Function,
  advancedSearch: boolean,
  toggleAdvancedSearch: Function,
}