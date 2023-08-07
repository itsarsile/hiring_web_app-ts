import LoginForm from "@/components/Form/Login";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 h-screen mx-auto">
      {/* Hero Section */}
      <div className="hidden lg:block lg:w-1/2 w- relative">
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

      {/* Login Form Section */}
      <div className="flex flex-col lg:w-1/2 gap-5 mx-auto min-h-screen justify-center max-w-lg p-5 lg:p-0">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Halo, Pewpeople!</h1>
          <h2 className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nihil
            libero odio quod quidem facere!
          </h2>
          <LoginForm />
          <p className="text-center lg:text-left">
            Belum punya akun?{" "}
            <span className="text-amber-400 ">
              <Link href="/auth/register">Daftar</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
