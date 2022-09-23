import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { useSearchContext } from "../../../context/SearchContext";

export default function SearchFiltersList({ item }: { item: string[] }) {
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
      <TagLabel p={2}>{item[1].replace("-", "–")}</TagLabel>
      <TagCloseButton onClick={() => handleRemoveFilter(item[1])} />
    </Tag>
  )
}