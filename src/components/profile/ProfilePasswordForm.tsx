import "../form/Form.css";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import FormPasswordField from "../form/FormPasswordField";
import FormSubmitButton from "../form/FormSubmitButton";
import { Put } from "../../utils/api";
import { requiredErrorMsg } from "../../utils/globals/globals";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfilePasswordForm() {
  const { currentUser } = useAuthContext();
  const [serverError, setServerError] = useState("");

  const updatePasswordSchema = yup.object().shape({
    oldPassword: yup.string()
      .required(requiredErrorMsg),
    password: yup.string()
      .required(requiredErrorMsg)
      .min(8, "Password must be at least 8 characters."),
    passwordConfirm: yup.string()
      .required(requiredErrorMsg)
      .oneOf([yup.ref("password")], "Passwords must match."),
  })

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={updatePasswordSchema}
      validateOnChange={false}
      onSubmit={async (user) => {
        try {
          setServerError("");
          const res = await Put("/user", { id: currentUser._id, ...user });
          //if (res.ok) TODO: success msg
        } catch(err: any) {
          setServerError(err.response.data ? err.response.data : err.response.statusText);
        }
      }}
    >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <FormPasswordField fieldName="oldPassword" fieldLabel="Old Password" req={true} />
        <FormPasswordField fieldName="password" fieldLabel="New Password" req={true} />
        <FormPasswordField fieldName="passwordConfirm" fieldLabel="Confirm New Password" req={true} />
        {serverError ? <div className="server-error">Error: {serverError}</div> : null}
        <FormSubmitButton buttonLabel="Save" />
      </form>
    )}
    </Formik>
  )
}