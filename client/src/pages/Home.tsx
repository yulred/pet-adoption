import { Box, Container, useColorMode } from "@chakra-ui/react";
import Header from "../components/home/Header";

export default function Home() {
  const { colorMode } = useColorMode();

  const homeBg = {
    backgroundImage: colorMode === "light" ?
      "url(" + require("../assets/light.jpg") + ")" :
      "url(" + require("../assets/dark.jpg") + ")",
    backgroundSize: "40%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom left",
    height: "90vh",
  }
  
  return (
    <Box p={12} style={homeBg}>
      <Container maxW="md" textAlign="left" pl={20}>
        <Header />
      </Container>
    </Box>
  )
}