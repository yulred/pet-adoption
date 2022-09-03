import "../form/Form.css";
import { useEffect, useState, useRef } from "react";
import { 
  Flex, Input, useToast, UseToastOptions, FormControl, FormLabel,
  Menu, MenuButton, MenuList, MenuItem, useOutsideClick
} from "@chakra-ui/react";
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
import { Put, Get, Post } from "../../utils/api";
import { IPet } from "../../ts/interfaces/pet.interface";

export default function PetEditForm({ currentPet, getPet }: { currentPet: IPet, getPet: Function }) {
  const [serverError, setServerError] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [userInput, setUserInput] = useState({_id: "", name: "", email: ""});
  const [searchRes, setSearchRes] = useState<{_id: string, name: string, email: string}[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toast = useToast();
  let location = useLocation();
  useOutsideClick({
    ref: menuRef,
    handler: () => setIsMenuOpen(false),
  })

  useEffect(() => {
    if (!location.pathname.split("/").includes("new")) setIsEditing(true); // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!userInput?._id && userInput?.name && userInput?.name.length > 1) {
        setIsMenuOpen(true);
        handleUserSearch(userInput.name);
      }
      else setIsMenuOpen(false);
    }, 300)

    return () => clearTimeout(debounce);
  }, [userInput])

  const handleUserSearch = async (userQuery: string) => {
    try {
      const res = await Get(`/user/search?q=${userQuery}`);
      setSearchRes(res);
    } catch(err) {
      console.log(err);
    }
  }

  const petSchema = yup.object().shape({
    type: yup.string(),
    name: yup.string()
      .required(requiredErrorMsg),
    adoptionStatus: yup.string(),
    height: yup.number()
      .required(requiredErrorMsg),
    weight: yup.number()
      .required(requiredErrorMsg),
    color: yup.string()
      .required(requiredErrorMsg),
    hypoallergenic: yup.bool(),
    dietary: yup.string(),
    breed: yup.string()
      .required(requiredErrorMsg),
    bio: yup.string(),
  })

  return (
    <Flex justify="center">
      <BackButton />
      <Formik
        initialValues={{
          type: currentPet.type || "Dog",
          name: currentPet.name || "",
          adoptionStatus: currentPet.adoptionStatus || "Available",
          height: currentPet.height || "",
          weight: currentPet.weight || "",
          color: currentPet.color || "",
          bio: currentPet.bio || "",
          hypoallergenic: currentPet.hypoallergenic || false,
          dietary: currentPet.dietary?.join(", ") || "",
          breed: currentPet.breed || "",
        }}
        validationSchema={petSchema}
        validateOnChange={false}
        onSubmit={async (pet, { resetForm }) => {
          try {
            setServerError("");
            const url = location.pathname.split("dashboard")[1];
            const petData = new FormData();

            for (const key in pet) {
              petData.append(`${key}`, `${pet[key as keyof typeof pet]}`);
            }

            if (currentPet._id) petData.append("id", currentPet._id);
            if (selectedFile) petData.append("picture", selectedFile);
            if (userInput?._id) petData.append("owner", userInput._id);

            const res = isEditing ? await Put(url, petData) : await Post(url, petData);
            const descriptionText = isEditing ? "Pet successfully updated." : "Pet successfully added.";

            if (res.ok) {
              toast({ ...toastSuccessOptions as UseToastOptions, description: descriptionText });
              isEditing ? await getPet(url) : resetForm();
            }
          } catch(err: any) {
            console.log(err)
            setServerError(err.response.data ? err.response.data : err.response.statusText);
          }
        }}
      >
      {({ values, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {isEditing
            ? <PetImage imageSrc={currentPet.picture} imageAlt={currentPet.name} imageSize={12} imageRadius={175} />
            : null}
          <FormHeaderField fieldName="name" fieldLabel={isEditing ? "Edit:" : "Add:"} req={true} />
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
          {values.adoptionStatus === "Adopted" || values.adoptionStatus === "Fostered"
            ? <>
                <FormControl display="flex" flexFlow="row wrap" alignItems="center">
                  <FormLabel w="8rem">Owner</FormLabel>
                  <Menu isOpen={isMenuOpen} autoSelect={false} flip={false}>
                    <MenuButton></MenuButton>
                    <MenuList mt={4} ref={menuRef} fontSize="md">
                      {searchRes.map(item => {return (
                        <>
                          <MenuItem key={item._id} onClick={() => {setUserInput(item); setIsMenuOpen(false)}}>
                            {item.name}
                          </MenuItem>
                          <MenuItem key={item.email} onClick={() => {setUserInput(item); setIsMenuOpen(false)}}>
                            {item.email}
                          </MenuItem>
                        </>
                      )})}
                    </MenuList>
                  </Menu>
                  <Input
                    name="owner"
                    w="12rem"
                    value={!userInput?._id ? userInput?.name : `${userInput?.name} (${userInput?.email})`}
                    onChange={(e) => setUserInput({_id: "", name: e.target.value, email: ""})}
                  />
                </FormControl>
              </>
            : null}
          <FormInputField fieldName="height" fieldLabel="Height" fieldUnit="cm" fieldSize="20%" req={true} />
          <FormInputField fieldName="weight" fieldLabel="Weight" fieldUnit="kg" fieldSize="20%" req={true} />
          <FormCheckbox fieldName="hypoallergenic" fieldLabel="Hypoallergenic" isChecked={currentPet.hypoallergenic} />
          <FormInputField fieldName="color" fieldLabel="Colour" req={true} />
          <FormInputField fieldName="dietary" fieldLabel="Dietary Restrictions (separated by comma)" req={false} />
          <FormInputField fieldName="breed" fieldLabel="Breed" req={true} />
          <FormTextareaField fieldName="bio" fieldLabel="Bio" req={false} />
          {serverError ? <div className="server-error">Server Error: {serverError}</div> : null}
          <FormSubmitButton buttonLabel="Save" />
        </form>
      )}
      </Formik>
    </Flex>
  )
}