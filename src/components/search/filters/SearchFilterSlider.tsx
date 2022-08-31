import "./SearchFilterSlider.css";
import { useState } from "react";
import { Flex, RangeSlider, RangeSliderTrack, RangeSliderMark, RangeSliderFilledTrack, RangeSliderThumb, useColorMode } from "@chakra-ui/react";
import { useSearchContext } from "../../../context/SearchContext";
import { ISearchFilterRange } from "../../../ts/interfaces/search.interface";

export default function SearchFilterSlider({ filter }: ISearchFilterRange) {
  const { handleAddRangeFilter } = useSearchContext();
  const [sliderMark, setSliderMark] = useState<number[]>([]);
  const [showSliderMark, setShowSliderMark] = useState(false);
  const { colorMode } = useColorMode();

  return (
    <Flex wrap="nowrap">
      <div className="slider-label">{filter}</div>
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