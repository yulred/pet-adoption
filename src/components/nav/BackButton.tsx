import { Icon, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <IconButton
      aria-label="Back"
      icon={<Icon as={ChevronLeftIcon} boxSize={8} />}
      variant="unstyled"
      mr="1rem"
      ml="-3rem"
      onClick={() => navigate(-1)}
    />
  )
}