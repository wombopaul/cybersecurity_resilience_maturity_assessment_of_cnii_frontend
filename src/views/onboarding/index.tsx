'use client'
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "@/components/forms/login";
import RegisterForm from "@/components/forms/register";

const Onboarding = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  
    return <div className="flex flex-col md:flex-row w-full p-5 min-h-screen overflow-hidden">
    {/* Left Side */}
    <div className="hidden md:flex md:w-1/2 w-full h-full md:h-full text-white flex-col items-center justify-center p-8 relative">
      <motion.div
      className="w-full h-full rounded-lg overflow-hidden sm:w-full tab:w-[215px] shadow-lg"
      initial={{opacity: 0, y: 30, scale: 0.95}}
      animate={{opacity: 1, y: 0, scale: 1}}
      transition={{duration: 0.5, ease: "easeOut", delay: 3 * 0.2}}
      whileHover={{scale: 1.05, transition: {duration: 0.3}}}
      onClick={()=>{}}
    >
      <Image
          src={require('../../../public/images/1.jpg')}
          width={600}
          height={600}
          alt={"signup"}
          className="w-full h-full"
        />
      </motion.div>
    </div>

    {/* Right Side */}
    <div className="md:w-1/2 w-full flex items-center justify-center p-8">
      {
        !isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegisterForm setIsLogin={setIsLogin} />
      }
    </div>
  </div>
}

export default Onboarding