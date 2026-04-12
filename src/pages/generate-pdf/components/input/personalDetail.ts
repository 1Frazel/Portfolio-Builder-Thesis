export interface IPersonalDetail {
  jobTarget: string;
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  postalCode: string;
  cityState: string;
  country: string;
  address: string;
}

export const defaultPersonalDetail = {
  jobTarget: "",
  photo: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  linkedinUrl: "",
  postalCode: "",
  cityState: "",
  country: "",
  address: "",
};
