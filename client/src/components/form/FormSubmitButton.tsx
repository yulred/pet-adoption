import { Box, Button } from "@chakra-ui/react";

export default function FormSubmitButton({ buttonLabel }: { buttonLabel: string }) {

  return (
    <Box textAlign="right">
      <Button mt={4} colorScheme="teal" type="submit">{buttonLabel}</Button>
    </Box>
  )
}