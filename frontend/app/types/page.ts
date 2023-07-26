// import * as Yup from 'yup';

// const SignupSchema = Yup.object().shape({
//   first_name: Yup.string()
//     .required('First name is required')
//     .min(3, 'First name must be at least 3 characters')
//     .max(50, 'First name can be at most 50 characters'),
    
//    last_Name: Yup.string()
//     .required('last name is required')
//     .min(3, 'last name must be at least 3 characters')
//     .max(50, 'last name can be at most 50 characters'),

//   email: Yup.string()
//     .required('Email is required')
//     .email('Invalid email address'),

//   password: Yup.string()
//     .required('Password is required')
//     .min(8, 'Password must be at least 8 characters')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//       'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
//     ),

// });


export interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }
  export interface ProductItem {
    id: number;
    title: string;
    message: string;
  }
   export interface ProductProps {
    token: string;
  }
 export interface User {
    email: string;
    password: string;
  }
 export interface NavbarProps {
    hasToken: boolean;
    onLogout: () => void;
  }
  