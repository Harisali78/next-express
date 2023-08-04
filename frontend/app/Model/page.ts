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
export interface AddProducts{
  title?: String,
  description?: String,
  price?: number,
  review?: String
}
export const AddProductsSchema = Yup.object({
  title: Yup.string().min(5).max(50).required("Please Enter a title of a product"),
  description: Yup.string().min(10).max(100).required("Pleae Enter description about your product"),
  price: Yup.number().min(2).max(30).required("Enter the price of a product"),
  review: Yup.string().min(10).max(100).required("Write Reviews about the product"),
})


