import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import LoginForm from "@/components/Form/Login";

const LoginPage = () => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block overflow-y-hidden h-min-screen">
        <div className="flex gap-5 relative">
          <div className="hero bg-[url('../public/bg-login.png)] h-screen w-1/2">
            <div className="hero-overlay bg-indigo-900/60"></div>
            <Image
              src="/logo.svg"
              width={86}
              height={24}
              alt="logo"
              className="absolute top-0 left-0 m-5"
            />
            <div className="hero-content ma">
              <h1 className="text-4xl leading-normal text-white font-bold max-w-lg">
                Temukan developer berbakat & terbaik di berbagai bidang keahlian
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-5 max-w-lg justify-center h-screen mx-auto">
            <h1 className="text-4xl font-bold">Halo, Pewpeople!</h1>
            <h2 className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nihil
              libero odio quod quidem facere!
            </h2>
            <LoginForm />
            <p className="text-center">
              Belum punya akun?{" "}
              <span className="text-amber-400">
                <Link href="/auth/register">Daftar</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
