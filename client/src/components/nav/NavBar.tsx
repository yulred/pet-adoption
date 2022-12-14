import "./NavBar.css";
import { Box, Link, useDisclosure, Flex, useMediaQuery } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import FormModal from "../registration/FormModal";
import ProfileMenu from "./ProfileMenu";

export default function NavBar() {
  const { isActiveSession } = useAuthContext();
  const { isOpen, onToggle } = useDisclosure();
  const [isSmallerThan450] = useMediaQuery("(max-width: 450px)");
  const toggleModal = () => onToggle();
  
  return (
    <Box h="10vh" className="nav-bar">
      <Flex
        justify={isSmallerThan450 ? "center" : "end"}
        align="center"
        gap={6}
        py={6}
        pl={6}
        pr={isSmallerThan450 ? 0 : 6}
        className="small-caps"
      >
        <Link as={NavLink} to="/">Home</Link>
        {isActiveSession ? <ProfileMenu /> : null}
        {!isActiveSession ? <Link onClick={toggleModal}>Log&nbsp;In/<wbr />Sign&nbsp;Up</Link> : null}
        <Link as={NavLink} to="/search">Search</Link>
        <ColorModeSwitcher justifySelf="flex-end" alignSelf="center" />
      </Flex>
      <FormModal isOpen={isOpen} toggleModal={toggleModal} />
    </Box>
  )
}