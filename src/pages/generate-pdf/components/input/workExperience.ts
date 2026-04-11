export interface IWorkExperience {
  id: number;
  jobTitle: string;
  employer: string;
  startAt: string;
  endsAt: string;
  address: string;
  description: string;
}

export const listWorkExperiences = [
  {
    id: "jobTitle",
    label: "Job Title",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "employer",
    label: "Employer",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "startAndEndDate",
    label: "Start & End Date",
    placeholder: "MM // YYYY",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "date",
  },
  {
    id: "address",
    label: "Address",
    placeholder: "",
    containerClass: "",
    labelClass: "",
    inputClass: "",
    inputType: "text",
  },
  {
    id: "description",
    label: "Description",
    placeholder: "",
    containerClass: "col-span-2",
    labelClass: "",
    inputClass: "",
    inputType: "textarea",
  },
];

const initialWorkExperiences = Object.fromEntries(
  listWorkExperiences
    .filter((item) => item.id !== "startAndEndDate")
    .map((work) => [work.id, ""]),
) as unknown as IWorkExperience;

export const defaultWorkExperiences = {
  ...initialWorkExperiences,
  id: 0,
  startAt: "",
  endsAt: "",
};
