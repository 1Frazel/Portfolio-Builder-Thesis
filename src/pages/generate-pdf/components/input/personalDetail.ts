import type { IPersonalDetail } from "../templates/ats-template/AtsTemplate";

export interface IListInput {
  id: string;
  label: string;
  placeholder: string;
  containerClass: string;
  labelClass: string;
  inputClass: string;
  inputType: string;
}

export const listPersonalDetail = [
  {
    id: "jobTarget",
    label: "Job Target",
    placeholder: "The role you want",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "photo",
    label: "Upload Photo",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "file",
  },
  {
    id: "firstName",
    label: "First Name",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "phone",
    label: "Phone",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "linkedinUrl",
    label: "Linkedin URL",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "postalCode",
    label: "Postal Code",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "cityState",
    label: "City, State",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "country",
    label: "Country",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "address",
    label: "Address",
    placeholder: "",
    containerClass: "col-span-2",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
];

export const defaultPersonalDetail = Object.fromEntries(
  listPersonalDetail.map((detail) => [detail.id, ""]),
) as unknown as IPersonalDetail;
