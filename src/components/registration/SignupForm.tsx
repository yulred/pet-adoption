import "./Form.css";
import { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import PasswordInput from "./PasswordInput";

export default function SignupForm() {
  const [userInput, setUserInput] = useState({});

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({...userInput, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post("http://localhost:8080/users/register", userInput)
      .then(res => console.log(res))
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input type="text" name="name" onChange={(e) => handleUserInput(e)} />
      </FormControl>
      <FormControl>
        <FormLabel>E-Mail</FormLabel>
        <Input type="email" name="email" onChange={(e) => handleUserInput(e)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <PasswordInput handleUserInput={handleUserInput} fieldName="password" />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <PasswordInput handleUserInput={handleUserInput} fieldName="confirmedPassword" />
      </FormControl>
      <FormControl>
        <FormLabel>Phone Number</FormLabel>
        <Input type="tel" name="tel" onChange={(e) => handleUserInput(e)} />
      </FormControl>
      <div className="submit-button">
        <Button mt={4} colorScheme="teal" type="submit">Sign Up</Button>
      </div>
    </form>
  )
}