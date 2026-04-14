export interface IEducation {
  id: number;
  school: string;
  degree: string;
  startAt: string;
  endsAt: string;
  city: string;
  description: string;
}

export const defaultEducation = {
  id: 0,
  school: "",
  degree: "",
  startAt: "",
  endsAt: "",
  city: "",
  description: "",
};
