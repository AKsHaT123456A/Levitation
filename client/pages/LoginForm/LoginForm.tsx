import React from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import InputField from "../../src/components/Input/InputComponent";
import Checkbox from "../../src/components/Input/CheckBoxComponent";
import PasswordInput from "../../src/components/Input/PasswordField";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
 
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [message, setMessage] = React.useState("");

  const onSubmit = handleSubmit(async (formData, e) => {
    e?.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        formData 
      );
      setMessage(response.data.message);
      const id = response.data.id;
      localStorage.setItem("id",id);
      localStorage.setItem("token", response.data.token);
      navigate("/details");
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
        <form action="submit" className="space-y-6" onSubmit={onSubmit}>
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox label="Remember Me" id="remember" />
            </div>
            <div>
              <a href="" className="font-medium text-sm text-blue-500">
                Forget Password
              </a>
            </div>
          </div>
          <div>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
              Login
            </button>
          </div>
        </form>
        {message && <p className="text-red-500 mt-2 flex justify-center">{message}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
