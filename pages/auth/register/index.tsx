import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Register from "@/components/Form/Register";

const RegisterPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 h-screen mx-auto">
      {/* Hero Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="hero bg-hero-login-img h-screen">
          <div className="hero-overlay bg-indigo-900/60"></div>
          <Image
            src="/logo.svg"
            width={86}
            height={24}
            alt="logo"
            className="absolute top-0 left-0 m-5"
          />
          <div className="hero-content max-w-lg">
            <h1 className="text-4xl leading-normal text-white font-bold">
              Temukan developer berbakat & terbaik di berbagai bidang keahlian
            </h1>
          </div>
        </div>
      </div>

      {/* Register Form Section */}
      <div className="flex flex-col lg:w-1/2 gap-5 mx-auto min-h-screen justify-center max-w-lg">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Halo, Pewpeople!</h1>
          <h2 className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nihil
            libero odio quod quidem facere!
          </h2>
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
