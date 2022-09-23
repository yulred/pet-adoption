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