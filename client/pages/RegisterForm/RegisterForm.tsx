import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import InputField from "../../src/components/Input/InputComponent";
import PasswordInput from "../../src/components/Input/PasswordField";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>();
  const [message, setMessage] = useState<string>("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("http://localhost:3000/api/v1/auth/register", data);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.message
        ) {
          const errMessage = axiosError.response.data.message;
          setMessage(errMessage);
          console.error(errMessage);
        } else {
          console.error("An error occurred:", axiosError.message);
        }
      } else {
        console.error("An error occurred:", error);
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">Levitation</div>
        <div className="text-3xl font-bold text-blue-500 mt-2 text-center">
          Always Levitating You Up!!
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form action="" className="space-y-6" onSubmit={onSubmit}>
          <InputField
            label="Name"
            id="username"
            type="text"
            name="username"
            register={register}
            placeholder="Name"
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            name="email"
            register={register}
            placeholder="Email"
          />
          <PasswordInput
            label="Password"
            id="password"
            name="password"
            register={register}
            placeholder="Password"
            required
          />
          <div>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
              Register
            </button>
          </div>
        </form>
        {message && (
          <p className=" flex justify-center text-red-500 mt-2">{message}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
