import "../form/Form.css";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import FormInputField from "../form/FormInputField";
import FormTextareaField from "../form/FormTextareaField";
import FormSubmitButton from "../form/FormSubmitButton";
import { telRegExp } from "../../utils/globals/globals";
import { Put } from "../../utils/api";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileSettingsForm() {
  const { currentUser, getCurrentUser } = useAuthContext();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  const updateUserSchema = yup.object().shape({
    name: yup.string()
      .min(2, "Name must be at least 2 characters."),
    email: yup.string()
      .email("Invalid e-mail."),
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
        tel: currentUser.tel,
        bio: currentUser.bio,
      }}
      validationSchema={updateUserSchema}
      validateOnChange={false}
      onSubmit={async (user) => {
        try {
          setServerError("");
          const res = await Put("/user", { id: currentUser._id, ...user });
          if (res.ok) getCurrentUser(currentUser._id);
        } catch(err: any) {
          setServerError(err.response.data ? err.response.data : err.response.statusText);
        }
      }}
    >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <FormInputField fieldName="name" fieldType="text" fieldLabel="Full Name" req={false} />
        <FormInputField fieldName="email" fieldType="email" fieldLabel="E-Mail" req={false} />
        <FormInputField fieldName="tel" fieldType="tel" fieldLabel="Phone Number" req={false} />
        <FormTextareaField fieldName="bio" fieldLabel="Bio" req={false} />
        {serverError ? <div className="server-error">Error: {serverError}</div> : null}
        <FormSubmitButton buttonLabel="Save" />
      </form>
    )}
    </Formik>
  )
}