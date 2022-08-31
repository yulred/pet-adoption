import "../form/Form.css";
import { useState } from "react";
import { Flex, useToast, UseToastOptions } from "@chakra-ui/react";
import { Formik } from "formik";
import { useLocation } from "react-router-dom";
import FilePicker from "chakra-ui-file-picker";
import * as yup from "yup";
import FormInputField from "../form/FormInputField";
import FormHeaderField from "../form/FormHeaderField";
import FormSelectField from "../form/FormSelectField";
import FormCheckbox from "../form/FormCheckbox";
import FormTextareaField from "../form/FormTextareaField";
import FormSubmitButton from "../form/FormSubmitButton";
import BackButton from "../nav/BackButton";
import PetImage from "../pets/PetImage";
import { requiredErrorMsg, petTypes, petStatus, toastSuccessOptions } from "../../utils/globals/globals";
import { Put } from "../../utils/api";
import { IPet } from "../../ts/interfaces/pet.interface";

export default function PetEditForm({ currentPet, getPet }: { currentPet: IPet, getPet: Function }) {
  const [serverError, setServerError] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const toast = useToast();
  let location = useLocation();

  //TODO: clean this up

  const petSchema = yup.object().shape({
    type: yup.string()
      .required(requiredErrorMsg),
    name: yup.string()
      .required(requiredErrorMsg),
    adoptionStatus: yup.string()
      .required(requiredErrorMsg),
    height: yup.number()
      .required(requiredErrorMsg),
    weight: yup.number()
      .required(requiredErrorMsg),
    color: yup.string()
      .required(requiredErrorMsg),
    bio: yup.string()
      .required(requiredErrorMsg),
    hypoallergenic: yup.bool(),
    dietary: yup.string(),
    breed: yup.string()
      .required(requiredErrorMsg),
  })

  return (
    <Flex justify="center">
      <BackButton />
      <Formik
        initialValues={{
          type: currentPet.type,
          name: currentPet.name,
          adoptionStatus: currentPet.adoptionStatus,
          height: currentPet.height,
          weight: currentPet.weight,
          color: currentPet.color,
          bio: currentPet.bio,
          hypoallergenic: currentPet.hypoallergenic,
          dietary: currentPet.dietary?.join(", "),
          breed: currentPet.breed,
        }}
        validationSchema={petSchema}
        validateOnChange={false}
        onSubmit={async (pet) => {
          try {
            setServerError("");
            const url = location.pathname.split("dashboard")[1];
            const petData = new FormData();

            for (const key in pet) {
              petData.append(key, `${pet[key as keyof typeof pet]}`);
            }

            petData.append("id", currentPet._id!);
            petData.append("picture", selectedFile);

            const res = await Put(url, petData);

            if (res.ok) {
              toast({ ...toastSuccessOptions as UseToastOptions, description: "Pet successfully updated." });
              await getPet(url);
            }
          } catch(err: any) {
            setServerError(err.response.data ? err.response.data : err.response.statusText);
          }
        }}
      >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <PetImage imageSrc={currentPet.picture} imageAlt={currentPet.name} imageSize={12} imageRadius={175} />
          <FormHeaderField fieldName="name" fieldLabel="Edit:" req={true} />
          <FilePicker
            onFileChange={(fileList: any[]) => setSelectedFile(fileList[0])}
            multipleFiles={false}
            accept="image/*"
            hideClearButton={false}
            clearButtonLabel="Clear File"
            placeholder={"Choose image..."}
          />
          <FormSelectField fieldName="type" fieldLabel="Pet Type" fieldArray={petTypes} />
          <FormSelectField fieldName="adoptionStatus" fieldLabel="Adoption Status" fieldArray={petStatus} />
          <FormInputField fieldName="height" fieldLabel="Height" fieldUnit="cm" fieldSize="20%" req={true} />
          <FormInputField fieldName="weight" fieldLabel="Weight" fieldUnit="kg" fieldSize="20%" req={true} />
          <FormCheckbox fieldName="hypoallergenic" fieldLabel="Hypoallergenic" isChecked={currentPet.hypoallergenic} />
          <FormInputField fieldName="color" fieldLabel="Colour" req={true} />
          <FormInputField fieldName="dietary" fieldLabel="Dietary Restrictions (separated by comma)" req={false} />
          <FormInputField fieldName="breed" fieldLabel="Breed" req={true} />
          <FormTextareaField fieldName="bio" fieldLabel="Bio" req={true} />
          {serverError ? <div className="server-error">Error: {serverError}</div> : null}
          <FormSubmitButton buttonLabel="Save" />
        </form>
      )}
      </Formik>
    </Flex>
  )
}