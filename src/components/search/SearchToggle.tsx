import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useSearchContext } from "../../context/SearchContext";

export default function SearchToggle() {
  const { advancedSearch, toggleAdvancedSearch } = useSearchContext();

  return (
    <FormControl display="flex" justifyContent="end" alignItems="center" mt={3}>
      <Switch id="advanced-search" colorScheme="teal" isChecked={advancedSearch} onChange={() => toggleAdvancedSearch()} />
      <FormLabel htmlFor="advanced-search" mb={0} ml={2}>Advanced&nbsp;Search</FormLabel>
    </FormControl>
  )
}