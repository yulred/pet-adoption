import { Flex } from "@chakra-ui/react";
import { useSearchContext } from "../../context/SearchContext";
import SearchFilterTag from "./SearchFilterTag";

export default function SearchFiltersList() {
  const { filters } = useSearchContext();

  return (
    <Flex wrap="wrap" mt={5} gap={2}>
      {filters.map((item, index) => <SearchFilterTag key={index} item={item} />)}
    </Flex>
  )
}