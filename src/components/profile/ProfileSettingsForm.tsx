import { useState } from "react";
import { FormControl, FormLabel, Input, Textarea, Button, FormErrorMessage } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { telRegExp } from "../../utils/globals/globals";
import { Put } from "../../utils/api";
import { useSessionContext } from "../../context/SessionContext";
import PasswordInput from "../registration/PasswordInput";

export default function ProfileSettingsForm() {
  const { currentUser } = useSessionContext();
  const [serverError, setServerError] = useState("");
  let navigate = useNavigate();

  const updateUserSchema = yup.object().shape({
    name: yup.string()
      .min(2, "Name must be at least 2 characters."),
    email: yup.string()
      .email("Invalid e-mail."),
    password: yup.string()
      .min(8, "Password must be at least 8 characters."),
    passwordConfirm: yup.string()
      .oneOf([yup.ref("password")], "Passwords must match."),
    tel: yup.string()
      .matches(telRegExp, "Invalid phone number."),
    bio: yup.string()
      .max(350, "Bio can't exceed 350 characters."),
  })

  return (
    <Formik
      initialValues={{
        name: currentUser.name,
        email: currentUser.email,
        password: "",
        passwordConfirm: "",
        tel: currentUser.tel,
        bio: currentUser.bio,
      }}
      validationSchema={updateUserSchema}
      validateOnChange={false}
      onSubmit={async (user) => {
        try {
          setServerError("");
          const res = await Put("/user", { id: currentUser._id, ...user });
          if (res.ok) navigate(0);
        } catch(err: any) {
          setServerError(err.response.data ? err.response.data : err.response.statusText);
        }
      }}
    >
    {({ handleSubmit, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={errors.name !== undefined && touched.name}>
          <FormLabel>Full Name</FormLabel>
          <Field as={Input} type="text" name="name" />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email !== undefined && touched.email}>
          <FormLabel>E-Mail</FormLabel>
          <Field as={Input} type="email" name="email" />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password !== undefined && touched.password}>
          <FormLabel>New Password</FormLabel>
          <Field>
            {() => <PasswordInput fieldName="password" />}
          </Field>
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.passwordConfirm !== undefined && touched.passwordConfirm}>
          <FormLabel>Confirm New Password</FormLabel>
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
        <FormControl isInvalid={errors.bio !== undefined && touched.bio}>
          <FormLabel>Bio</FormLabel>
          <Field as={Textarea} name="bio" resize="vertical" />
          <FormErrorMessage>{errors.bio}</FormErrorMessage>
        </FormControl>
        {serverError ? <div className="server-error">Server Error: {serverError}</div> : null}
        <div className="submit-button">
          <Button mt={4} colorScheme="teal" type="submit">Save</Button>
        </div>
      </form>
    )}
    </Formik>
  )
}