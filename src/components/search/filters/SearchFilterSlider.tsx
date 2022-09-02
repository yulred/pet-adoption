import "./SearchFilterSlider.css";
import { useState } from "react";
import { 
  Flex, Text, useColorMode,
  RangeSlider, RangeSliderTrack, RangeSliderMark, RangeSliderFilledTrack, RangeSliderThumb
} from "@chakra-ui/react";
import { useSearchContext } from "../../../context/SearchContext";

export default function SearchFilterSlider({ filter }: { filter: string }) {
  const { handleAddRangeFilter } = useSearchContext();
  const [sliderMark, setSliderMark] = useState<number[]>([]);
  const [showSliderMark, setShowSliderMark] = useState(false);
  const { colorMode } = useColorMode();

  return (
    <Flex wrap="nowrap" mr={2}>
      <Text fontSize="md" fontWeight="semibold" mr={4} casing="capitalize">{filter}</Text>
      <RangeSlider
        aria-label={["min", "max"]}
        colorScheme="teal"
        defaultValue={[0, 100]}
        w="10rem"
        onChange={val => {setSliderMark(val); setShowSliderMark(true)}}
        onChangeEnd={val => {
          setSliderMark([0, 0]); 
          setShowSliderMark(false);
          handleAddRangeFilter(`${val.join("-")} ${filter === "height" ? "cm" : "kg"}`, filter)
        }}
      >
      {showSliderMark
        ? <>
            <RangeSliderMark
              value={sliderMark[0]}
              textAlign="center"
              color={colorMode === "light" ? "black" : "white"}
              mt="-8"
              ml="-5"
              minW="max-content"
              fontSize="1.1rem"
            >
              {`${sliderMark[0]} cm`}
            </RangeSliderMark>
            <RangeSliderMark
              value={sliderMark[1]}
              textAlign="center"
              color={colorMode === "light" ? "black" : "white"}
              mt="-8"
              ml="-5"
              minW="max-content"
              fontSize="1.1rem"
            >
              {`${sliderMark[1]} cm`}
            </RangeSliderMark>
          </>
        : null}
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Flex>
  )
}