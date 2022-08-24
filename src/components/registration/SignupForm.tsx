import "./Form.css";
import { useState } from "react";
import { FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { requiredErrorMsg, telRegExp } from "../../utils/globals/globals";
import { Post } from "../../utils/api";
import PasswordInput from "./PasswordInput";

export default function SignupForm() {
  const [serverError, setServerError] = useState("");
  let navigate = useNavigate();

  const signupSchema = yup.object().shape({
    name: yup.string()
      .required(requiredErrorMsg)
      .min(2, "Name must be at least 2 characters."),
    email: yup.string()
      .required(requiredErrorMsg)
      .email("Invalid e-mail."),
    password: yup.string()
      .required(requiredErrorMsg)
      .min(8, "Password must be at least 8 characters."),
    passwordConfirm: yup.string()
      .required(requiredErrorMsg)
      .oneOf([yup.ref("password")], "Passwords must match."),
    tel: yup.string()
      .matches(telRegExp, "Invalid phone number."),
  })

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        tel: "",
      }}
      validationSchema={signupSchema}
      validateOnChange={false}
      onSubmit={async (newUser) => {
        try {
          setServerError("");
          const res = await Post("/signup", newUser);
          if (res.ok) navigate(0);
        } catch(err: any) {
          setServerError(err.response.data ? err.response.data : err.response.statusText);
        }
      }}
    >
    {({ handleSubmit, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={errors.name !== undefined && touched.name}>
          <FormLabel>Full Name</FormLabel>
          <Field as={Input} type="text" name="name" />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.email !== undefined && touched.email}>
          <FormLabel>E-Mail</FormLabel>
          <Field as={Input} type="email" name="email" />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.password !== undefined && touched.password}>
          <FormLabel>Password</FormLabel>
          <Field>
            {() => <PasswordInput fieldName="password" />}
          </Field>
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.passwordConfirm !== undefined && touched.passwordConfirm}>
          <FormLabel>Confirm Password</FormLabel>
          <Field>
            {() => <PasswordInput fieldName="passwordConfirm" />}
          </Field>
          <FormErrorMessage>{errors.passwordConfirm}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.tel !== undefined && touched.tel}>
          <FormLabel>Phone Number</FormLabel>
          <Field as={Input} type="tel" name="tel" />
          <FormErrorMessage>{errors.tel}</FormErrorMessage>
        </FormControl>
        {serverError ? <div className="server-error">Error: {serverError}</div> : null}
        <div className="submit-button">
          <Button mt={4} colorScheme="teal" type="submit">Sign Up</Button>
        </div>
      </form>
    )}
    </Formik>
  )
}