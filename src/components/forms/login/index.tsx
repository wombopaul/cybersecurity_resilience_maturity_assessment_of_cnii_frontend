//#region Imports
import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import PrimaryTextInputComponent from "@/components/ui/inputs/text-input";
import { PostLogin } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { iLoginFormValidation } from "@/form-validators/auth";
import { useLogin } from "@/hooks/auth/login";
import PulseLoader from "react-spinners/PulseLoader";
//#endregion

type LoginFormProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const LoginForm = ({ setIsLogin }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostLogin>({
    resolver: yupResolver(iLoginFormValidation),
  });

  const { loading, handleLogin } = useLogin();

  const onLogin = (data: any) => {
    handleLogin && handleLogin(data);
  };

  return (
    <>
      <div className="w-full max-w-md min-h-screen overflow-hidden pt-16 md:pt-8">
        <h1 className="font-bold text-3xl">Login</h1>
        <h4 className="mb-10">
          Do not have an account?{" "}
          <button
            onClick={() => {
              setIsLogin && setIsLogin((val) => !val);
              // router.push('survey')
            }}
            className="text-green-500 cursor-pointer"
          >
            Sign up
          </button>{" "}
        </h4>
        <form className="space-y-4">
          <PrimaryTextInputComponent
            type="text"
            control={control}
            name="email"
            label="Email"
            placeholder="Enter email"
            error={errors.email?.message}
          />
          <PrimaryTextInputComponent
            type="password"
            control={control}
            name="password"
            label="Password"
            placeholder="Enter password"
            error={errors.password?.message}
          />
          <div className="flex justify-center">
            <motion.button
              onClick={handleSubmit(onLogin)}
              whileTap={{ scale: 0.85 }}
              disabled={loading}
              className="px-5 w-[80%] align-middle float-end h-[42px] my-10 text-md font-medium border bg-slate-50 rounded-[8px] text-gray-800 "
            >
              {loading ? <PulseLoader size={4} /> : "Login"}
            </motion.button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
