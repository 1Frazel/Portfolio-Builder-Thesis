export interface IWorkExperience {
  id: number;
  jobTitle: string;
  employer: string;
  startAt: string;
  endsAt: string;
  address: string;
  description: string;
}

export const defaultWorkExperiences = {
  id: 0,
  jobTitle: "",
  employer: "",
  startAt: "",
  endsAt: "",
  address: "",
  description: "",
};
