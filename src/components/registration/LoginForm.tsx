import "./Form.css";
import { useState } from "react";
import { FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { requiredErrorMsg } from "../../utils/globals/globals";
import { Post } from "../../utils/api";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
  const [serverError, setServerError] = useState("");
  let navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup.string()
      .required(requiredErrorMsg),
    password: yup.string()
      .required(requiredErrorMsg),
  })

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      validateOnChange={false}
      onSubmit={async (user) => {
        try {
          setServerError("");
          const res = await Post("/login", user);
          if (res.ok) navigate(0);
        } catch(err: any) {
          console.log(err)
          setServerError(err.response.data ? err.response.data : err.response.statusText);
        }
      }}
    >
    {({ handleSubmit, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={errors.email !== undefined && touched.email}>
          <FormLabel>E-Mail</FormLabel>
          <Field as={Input} name="email" type="email" />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.password !== undefined && touched.password}>
          <FormLabel>Password</FormLabel>
          <Field>
            {() => <PasswordInput fieldName="password" />}
          </Field>
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        {serverError ? <div className="server-error">Error: {serverError}</div> : null}
        <div className="submit-button">
          <Button mt={4} colorScheme="teal" type="submit">Log In</Button>
        </div>
      </form>
    )}
    </Formik>
  )
}