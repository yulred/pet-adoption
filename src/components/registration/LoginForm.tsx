import "./Form.css";
import { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import PasswordInput from "./PasswordInput";
import React from "react";

export default function LoginForm() {
  const [userInput, setUserInput] = useState({});

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({...userInput, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    axios.post("http://localhost:8080/login", userInput)
      .then(res => console.log(res))
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormControl>
        <FormLabel>E-Mail</FormLabel>
        <Input name="email" type="email" onChange={(e) => handleUserInput(e)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <PasswordInput handleUserInput={handleUserInput} fieldName="password" />
      </FormControl>
      <div className="submit-button">
        <Button mt={4} colorScheme="teal" type="submit">Log In</Button>
      </div>
    </form>
  )
}