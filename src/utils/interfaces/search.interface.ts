export interface ISearchFilterTag {
  item: string,
}

export interface ISearchContext {
  filters: string[],
  handleAddFilter: Function,
  handleRemoveFilter: Function,
  handleClearFilters: Function,
  advancedSearch: boolean,
  toggleAdvancedSearch: Function,
}

export interface ISearchContextProps {
  children: React.ReactNode,
}