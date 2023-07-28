import * as Yup from "yup";

export class UserEntity{
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

export const signupSchema = Yup.object({
    first_name: Yup.string().min(2).max(30).required("Please Enter Your First Name"),
    last_name: Yup.string().min(2).max(30).required("Pleae Enter your Last Name"),
    email: Yup.string().email().required("Please Enter Your Email"),
    password: Yup.string().min(8).required("Enter a 8 Digit Valid Password"),
})
 export interface LoginEntity{
  email: string;
    password: string;
}
export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please Enter Your Email"),
  password: Yup.string().min(8).required("Enter a 8 Digit Valid Password"),
})
 


