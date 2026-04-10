import type { IAtsTemplateUser } from "../templates/ats-template/AtsTemplate";

export interface IPersonalDetail {
  id: string;
  label: string;
  placeholder: string;
  customClass: string;
  inputType: string;
}

export const personalDetail = [
  {
    id: "jobTarget",
    label: "Job Target",
    placeholder: "The role you want",
    customClass: "",
    inputType: "text",
  },
  {
    id: "photo",
    label: "Upload Photo",
    placeholder: "",
    customClass: "",
    inputType: "file",
  },
  {
    id: "firstName",
    label: "First Name",
    placeholder: "",
    customClass: "",
    inputType: "text",
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "",
    customClass: "",
    inputType: "text",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "",
    customClass: "",
    inputType: "text",
  },
  {
    id: "phone",
    label: "Phone",
    placeholder: "",
    customClass: "",
    inputType: "text",
  },
  {
    id: "linkedinUrl",
    label: "Linkedin URL",
    placeholder: "",
    customClass: "",
    inputType: "text",
  },
  {
    id: "postalCode",
    label: "Postal Code",
    placeholder: "",
    customClass: "",
    inputType: "text",
  },
  {
    id: "address",
    label: "Address",
    placeholder: "",
    customClass: "",
    inputType: "text",
  },
  {
    id: "country",
    label: "Country",
    placeholder: "",
    customClass: "",
    inputType: "text",
  },
];

export const defaultPersonalDetail = Object.fromEntries(
  personalDetail.map((detail) => [detail.id, ""]),
) as unknown as IAtsTemplateUser;
