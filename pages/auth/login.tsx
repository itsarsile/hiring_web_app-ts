import Image from "next/image";
import { useState } from "react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginPage = () => {
  const [setOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const formData = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result.ok) {
          console.log("Authentication successful");
          router.push("/");
        } else {
          console.error("Authentication gagal: ", result.error);
        }
      } catch (error) {
        console.error("An error occured while authenticating: ", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block overflow-y-hidden h-min-screen">
        <div className="flex gap-5 relative">
          <div className="hero bg-hero-login-img h-screen w-1/2">
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
            <form onSubmit={formData.handleSubmit} className="form-control">
              <div className="">
                <label htmlFor="" className="label">
                  Email
                </label>
                <input
                  name="email"
                  values={formData.values.email}
                  onChange={formData.handleChange}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Masukkan alamat email"
                />
              </div>
              <div className="">
                <label htmlFor="" className="label">
                  Password
                </label>
                <input
                  name="password"
                  onChange={formData.handleChange}
                  values={formData.values.password}
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Masukkan kata sandi"
                />
              </div>
              <a href="#" className="text-right mt-5">
                Lupa password?
              </a>
              <button
                type="submit"
                className="btn btn-block mt-5 bg-amber-400 text-white"
              >
                {isSubmitting ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>
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
