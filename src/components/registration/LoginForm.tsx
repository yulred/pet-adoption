import "../form/Form.css";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import FormInputField from "../form/FormInputField";
import FormPasswordField from "../form/FormPasswordField";
import FormSubmitButton from "../form/FormSubmitButton";
import { requiredErrorMsg } from "../../utils/globals/globals";
import { Post } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginForm({ toggleModal }: {toggleModal: Function}) {
  const { getCurrentUser } = useAuthContext();
  const [serverError, setServerError] = useState("");

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
          if (res.ok) {
            toggleModal();
            getCurrentUser(res.id);
          }
        } catch(err: any) {
          console.log(err)
          setServerError(err.response.data ? err.response.data : err.response.statusText);
        }
      }}
    >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <FormInputField fieldName="email" fieldType="email" fieldLabel="E-Mail" req={true} />
        <FormPasswordField fieldName="password" fieldLabel="Password" req={true} />
        {serverError ? <div className="server-error">Error: {serverError}</div> : null}
        <FormSubmitButton buttonLabel="Log In" />
      </form>
    )}
    </Formik>
  )
}