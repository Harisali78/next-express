"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useFormik } from "formik";
import { UserEntity, signupSchema } from "../Model/page";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: async (values: UserEntity) => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/v1/register",
            values
          );
          console.log("Registration successful!", response.data);
          router.push("/");
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    });

  return (
    <div>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="first_name" className="block font-bold mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.first_name && touched.first_name ? (
                <p>{errors.first_name}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block font-bold mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.last_name && touched.last_name ? (
                <p>{errors.last_name}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-1">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.email && touched.email ? <p>{errors.email}</p> : null}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : null}
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
