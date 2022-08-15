import { createContext, useContext, useReducer, useState } from "react";
import SearchReducer from "../reducers/SearchReducer";
import { ISearchContext, ISearchContextProps } from "../utils/interfaces/search.interface";

const SearchContext = createContext<ISearchContext>({
  filters: [],
  handleAddFilter: ()=>{},
  handleRemoveFilter: ()=>{},
  handleClearFilters: ()=>{},
  advancedSearch: false || true,
  toggleAdvancedSearch: ()=>{},
});

const SearchProvider = ({ children }: ISearchContextProps) => {
  const [filters, dispatchFilters] = useReducer(SearchReducer, []);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const handleAddFilter = (filter: string) => {
    dispatchFilters({
      type: "ADD_FILTER",
      data: filter,
    })
  }

  const handleRemoveFilter = (filter: string) => {
    dispatchFilters({
      type: "REMOVE_FILTER",
      data: filter,
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
    <SearchContext.Provider value={{ filters, handleAddFilter, handleRemoveFilter, handleClearFilters, advancedSearch, toggleAdvancedSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext);

export default SearchProvider;