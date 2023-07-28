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
  