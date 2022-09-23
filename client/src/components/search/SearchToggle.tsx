import { Center, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useSearchContext } from "../../context/SearchContext";

export default function SearchToggle() {
  const { advancedSearch, toggleAdvancedSearch } = useSearchContext();

  return (
    <Center>
      <FormControl
        display="flex"
        justifyContent="end"
        alignItems="center"
        mt={3}
        w="60%"
      >
        <Switch id="advanced-search" colorScheme="teal" isChecked={advancedSearch} onChange={() => toggleAdvancedSearch()} />
        <FormLabel htmlFor="advanced-search" mb={0} ml={2}>Advanced&nbsp;Search</FormLabel>
      </FormControl>
    </Center>
  )
}