import "./NavBar.css";
import { Link, useDisclosure, Flex } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { NavLink } from "react-router-dom";
import { useSessionContext } from "../../context/SessionContext";
import FormModal from "../registration/FormModal";
import ProfileMenu from "./ProfileMenu";

export default function NavBar() {
  const { isActiveSession } = useSessionContext();
  const { isOpen, onToggle } = useDisclosure()
  const toggleModal = () => onToggle();
  
  return (
    <div className="nav-bar">
      <Flex justify="end" align="center" gap={6} p={6}>
        <Link as={NavLink} to="/">Home</Link>
        {isActiveSession ? <ProfileMenu /> : <Link onClick={toggleModal}>Log&nbsp;In/<wbr />Sign&nbsp;Up</Link>}
        <Link as={NavLink} to="/search">Search</Link>
        <ColorModeSwitcher justifySelf="flex-end" alignSelf="center" />
      </Flex>
      <FormModal isOpen={isOpen} toggleModal={toggleModal} />
    </div>
  )
}