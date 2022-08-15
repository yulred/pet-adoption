import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { useSearchContext } from "../../context/SearchContext";
import { ISearchFilterTag } from "../../utils/interfaces/search.interface";

export default function SearchFiltersList({ item }: ISearchFilterTag) {
  const { handleRemoveFilter } = useSearchContext();

  return (
    <Tag
      size="lg"
      rounded="full"
      variant="solid"
      colorScheme="teal"
      minW="fit-content"
      justifyContent="space-between"
    >
      <TagLabel p={2}>{item}</TagLabel>
      <TagCloseButton onClick={() => handleRemoveFilter(item)} />
    </Tag>
  )
}