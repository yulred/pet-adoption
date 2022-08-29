import {
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton,
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { IFormModalProps } from "../../ts/interfaces/form.interface";

export default function FormModal({ isOpen, toggleModal }: IFormModalProps) {
 
  return (
    <Modal isOpen={isOpen} onClose={() => toggleModal()}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted colorScheme="teal">
            <TabList>
              <Tab>Log In</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm toggleModal={toggleModal} />
              </TabPanel>
              <TabPanel>
                <SignupForm toggleModal={toggleModal} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}