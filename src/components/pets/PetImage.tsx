import { Image } from "@chakra-ui/react";
import { IPetImage } from "../../ts/interfaces/pet.interface";

export default function PetImage({ imageSrc, imageAlt, imageSize, imageRadius }: IPetImage) {

  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      objectFit="cover"
      objectPosition="top"
      w="100%"
      h={`${imageSize}rem`}
      rounded="md"
      borderBottomLeftRadius={0}
      borderBottomRightRadius={imageRadius}
    />
  )
}