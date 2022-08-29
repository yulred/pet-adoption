import "../form/Form.css";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import FormInputField from "../form/FormInputField";
import FormPasswordField from "../form/FormPasswordField";
import FormSubmitButton from "../form/FormSubmitButton";
import { requiredErrorMsg, telRegExp } from "../../utils/globals/globals";
import { Post } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";

export default function SignupForm({ toggleModal }: { toggleModal: Function }) {
  const { getCurrentUser } = useAuthContext();
  const [serverError, setServerError] = useState("");

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
          if (res.ok) {
            toggleModal();
            getCurrentUser(res.id);
          }
        } catch(err: any) {
          setServerError(err.response.data ? err.response.data : err.response.statusText);
        }
      }}
    >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <FormInputField fieldName="name" fieldType="text" fieldLabel="Full Name" req={true} />
        <FormInputField fieldName="email" fieldType="email" fieldLabel="E-Mail" req={true} />
        <FormPasswordField fieldName="password" fieldLabel="Password" req={true} />
        <FormPasswordField fieldName="passwordConfirm" fieldLabel="Confirm Password" req={true} />
        <FormInputField fieldName="tel" fieldType="tel" fieldLabel="Phone Number" req={false} />
        {serverError ? <div className="server-error">Error: {serverError}</div> : null}
        <FormSubmitButton buttonLabel="Sign Up" />
      </form>
    )}
    </Formik>
  )
}