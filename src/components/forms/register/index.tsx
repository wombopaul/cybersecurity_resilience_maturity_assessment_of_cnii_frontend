//#region Imports
import { motion } from 'framer-motion'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import PrimaryTextInputComponent from "@/components/ui/inputs/text-input";
import PhoneNumberInputComponent from '@/components/ui/inputs/phone-number';
import DropDownSelectComponent from '@/components/ui/inputs/select-dropdown';
import { PostUser } from '@/models/user';
import PulseLoader from "react-spinners/PulseLoader";
import { yupResolver } from "@hookform/resolvers/yup";
import { iSignUpFormValidation } from '@/form-validators/auth';
import { useSignup } from '@/hooks/auth/signup';
import { useGetOrganizations } from '@/hooks/organizations';
import { useRouter } from 'next/navigation';
//#endregion

type RegisterFormProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

const RegisterForm = ({ setIsLogin }:RegisterFormProps) => {
    const {control, handleSubmit, setValue, formState:{ errors} } = useForm<PostUser>({
          resolver: yupResolver(iSignUpFormValidation),
        });

        const router = useRouter();

        const { loading, handleSignUp } = useSignup(()=>{
          console.log("Here :>>>>>>>>>>")
          router.replace('survey')
        });

        const { organizations } = useGetOrganizations();

  const onRegister = (data:PostUser) =>{
    handleSignUp && handleSignUp({
      full_name: data.full_name,
      org_id: Number(data.org_id?.value),
      phone_number: data.phone_number,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    })
  }

  return <>
  <div className="w-full max-w-md">
      <h1 className="font-bold text-3xl">Register</h1>
        <h4 className="mb-5">
          Already have an account?{" "}
          <button
            onClick={() => {
              setIsLogin && setIsLogin(val=>!val)
            }}
            className="text-green-500 cursor-pointer"
          >
            Login
          </button>{" "}
        </h4>
        <form className="space-y-4">
        <DropDownSelectComponent
          onInputValueChange={(val) => {
            // handleSearch && handleSearch({ author: val });
          }}
          label="Organization"
          control={control}
          name="org_id"
          setValue={setValue}
          options={organizations?.map((item)=>{ return { value: item.id.toString(), label: item.name }})}
          // options={[{ label: `item 1`, value: `1`}, { label: `item 2`, value: `2`}]}
          error={errors.org_id?.message?.toString()}
        />
            <PrimaryTextInputComponent
            type="text"
            control={control}
            name="full_name"
            label="Full Name"
            placeholder="Enter your fullname"
            error={errors.full_name?.message}
          />

        <PhoneNumberInputComponent
          control={control}
          name="phone_number"
          label="Phone number"
          placeholder="Enter phone number"
          type=""
          error={errors.phone_number?.message}
        />
        <PrimaryTextInputComponent
          type="text"
          control={control}
          name="email"
          label="Email"
          placeholder="Enter email"
          error={errors.email?.message}
        />
          
          <div className="flex flex-col md:flex-row w-full gap-4 justify-between">
          <div className="w-full md:w-[40%]">
            <PrimaryTextInputComponent
              type="password"
              control={control}
              name="password"
              label="Password"
              placeholder="Enter password"
              error={errors.password?.message}
            />
            </div>
            <div className="w-full md:w-[40%]">
            <PrimaryTextInputComponent
              type="password"
              control={control}
              name="password_confirmation"
              label="Confirm password"
              placeholder="Confirm password"
              error={errors.password_confirmation?.message}
            />
            </div>
          </div>
          <div className="flex justify-center">
          <motion.button
            onClick={handleSubmit(onRegister)}
            whileTap={{ scale: 0.85 }}
            disabled={loading}
            className="px-5 w-[80%] align-middle float-end h-[42px] my-5 text-md font-medium border bg-slate-50 rounded-[8px] text-gray-800 "
          >
            {loading ? <PulseLoader size={4} /> : 'Register'}
          </motion.button>
        </div>
        </form>
      </div></>
}

export default RegisterForm