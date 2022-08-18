import { Flex } from "@chakra-ui/react";
import { useSearchContext } from "../../context/SearchContext";
import SearchFilterTag from "./SearchFilterTag";

export default function SearchFiltersList() {
  const { filters } = useSearchContext();

  return (
    <Flex justify="center" wrap="wrap" mt={5} gap={2}>
      {filters
        .filter(item => item[0] !== "q")
        .map((item, index) => <SearchFilterTag key={index} item={item as string[]} />)}
    </Flex>
  )
}