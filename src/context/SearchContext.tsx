import { createContext, useContext, useReducer, useState } from "react";
import { Outlet } from "react-router-dom";
import SearchReducer from "../reducers/SearchReducer";
import { ISearchContext } from "../utils/interfaces/search.interface";

const SearchContext = createContext<ISearchContext>({
  filters: [],
  handleAddFilter: ()=>{},
  handleAddRangeFilter: ()=>{},
  handleAddQueryFilter: ()=>{},
  handleRemoveFilter: ()=>{},
  handleClearFilters: ()=>{},
  advancedSearch: true || false,
  toggleAdvancedSearch: ()=>{},
})

const SearchProvider = () => {
  const [filters, dispatchFilters] = useReducer(SearchReducer, []);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const handleAddFilter = (filter: string, group: string) => {
    dispatchFilters({
      type: "ADD_FILTER",
      data: filter,
      payload: group,
    })
  }

  const handleAddRangeFilter = (filter: string, group: string) => {
    dispatchFilters({
      type: "ADD_RANGE_FILTER",
      data: filter,
      payload: group,
    })
  }

  const handleAddQueryFilter = (filter: string) => {
    dispatchFilters({
      type: "ADD_QUERY_FILTER",
      data: filter,
      payload: "q",
    })
  }

  const handleRemoveFilter = (filter: string, group: string) => {
    dispatchFilters({
      type: "REMOVE_FILTER",
      data: filter,
      payload: group,
    })
  }

  const handleClearFilters = () => {
    dispatchFilters({
      type: "CLEAR_FILTERS",
    })
  }

  const toggleAdvancedSearch = () => {
    setAdvancedSearch(!advancedSearch);
    handleClearFilters();
  }

  return (
    <SearchContext.Provider value={{ filters, handleAddFilter, handleAddRangeFilter, handleAddQueryFilter, handleRemoveFilter, handleClearFilters, advancedSearch, toggleAdvancedSearch }}>
      <Outlet />
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext);

export default SearchProvider;