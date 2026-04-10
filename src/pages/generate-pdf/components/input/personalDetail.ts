import type { IAtsTemplateUser } from "../templates/ats-template/AtsTemplate";

export interface IPersonalDetail {
  id: string;
  label: string;
  placeholder: string;
  customClass: string;
}

export const personalDetail = [
  {
    id: "jobTarget",
    label: "Job Target",
    placeholder: "The role you want",
    customClass: "",
  },
  {
    id: "photo",
    label: "Upload Photo",
    placeholder: "",
    customClass: "",
  },
  {
    id: "firstName",
    label: "First Name",
    placeholder: "",
    customClass: "",
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "",
    customClass: "",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "",
    customClass: "",
  },
  {
    id: "phone",
    label: "Phone",
    placeholder: "",
    customClass: "",
  },
  {
    id: "linkedinUrl",
    label: "Linkedin URL",
    placeholder: "",
    customClass: "",
  },
  {
    id: "postalCode",
    label: "Postal Code",
    placeholder: "",
    customClass: "",
  },
  {
    id: "address",
    label: "Address",
    placeholder: "",
    customClass: "",
  },
  {
    id: "country",
    label: "Country",
    placeholder: "",
    customClass: "",
  },
];

export const defaultPersonalDetail = Object.fromEntries(
  personalDetail.map((detail) => [detail.id, ""]),
) as unknown as IAtsTemplateUser;
