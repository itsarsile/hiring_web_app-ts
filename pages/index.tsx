import Image from "next/image";
import Layout from "@/components/Layout";
import { signIn, useSession } from "next-auth/react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import TestimonyCarousel from "@/components/TestimonyCarousel";
import { Button } from "@mantine/core";

export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();
  console.log(data?.user, status);
  return (
    <Layout>
      <main>
        <section>
          <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <Image
                src="/landing_image_1.png"
                width={617}
                height={617}
                alt="landing page image"
              />
              <div className="space-y-5">
                <h1 className="text-3xl lg:text-5xl font-bold">
                  Talenta terbaik negri untuk perubahan revolusi 4.0
                </h1>
                <p className="text-lg text-slate-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  euismod ipsum et dui rhoncus auctor.
                </p>
                <Button
                  onClick={() => router.push("/home")}
                  color="violet.8"
                 className="btn-md lg:btn-lg bg-violet-600 text-white rounded-md"
                >
                  Mulai Dari Sekarang
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
              <Image
                src="/landing_image_2.png"
                width={617}
                height={617}
                alt="landing page image"
              />
              <div className="space-y-5">
                <h1 className="text-3xl lg:text-5xl font-bold">
                  Kenapa harus mencari talent di Peworld?
                </h1>
                <p className="text-lg text-slate-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  euismod ipsum et dui rhoncus auctor.
                </p>
                <div className="flex flex-col space-y-5">
                  <div className="flex space-x-5 lg:space-x-10">
                    <AiFillCheckCircle className="w-6 h-6 text-primary" />
                    <p className="text-slate-400">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                  <div className="flex space-x-5 lg:space-x-10">
                    <AiFillCheckCircle className="w-6 h-6 text-primary" />
                    <p className="text-slate-400">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                  <div className="flex space-x-5 lg:space-x-10">
                    <AiFillCheckCircle className="w-6 h-6 text-primary" />
                    <p className="text-slate-400">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                  <div className="flex space-x-5 lg:space-x-10">
                    <AiFillCheckCircle className="w-6 h-6 text-primary" />
                    <p className="text-slate-400">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                  <div className="flex space-x-5 lg:space-x-10">
                    <AiFillCheckCircle className="w-6 h-6 text-primary" />
                    <p className="text-slate-400">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <Image
                src="/landing_image_3.png"
                width={617}
                height={617}
                alt="landing page image"
              />
              <div className="space-y-5">
                <h1 className="text-3xl lg:text-5xl font-bold">Skill Talent</h1>
                <p className="text-lg text-slate-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  euismod ipsum et dui rhoncus auctor.
                </p>
                <div className="grid grid-cols-2 ">
                  <div className="flex flex-col space-y-3 lg:space-y-5">
                    <div className="flex lg:space-x-5">
                      <AiFillCheckCircle className="text-amber-400 w-6 h-6" />
                      <p>Java</p>
                    </div>
                    <div className="flex lg:space-x-5">
                      <AiFillCheckCircle className="text-amber-400 w-6 h-6" />
                      <p>Python</p>
                    </div>
                    <div className="flex lg:space-x-5">
                      <AiFillCheckCircle className="text-amber-400 w-6 h-6" />
                      <p>C++</p>
                    </div>
                    <div className="flex lg:space-x-5">
                      <AiFillCheckCircle className="text-amber-400 w-6 h-6" />
                      <p>UI & UX</p>
                    </div>
                    <div className="flex lg:space-x-5">
                      <AiFillCheckCircle className="text-amber-400 w-6 h-6" />
                      <p>System Analyst</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3 lg:space-y-5">
                    <div className="flex lg:space-x-5">
                      <AiFillCheckCircle className="text-amber-400 w-6 h-6" />
                      <p>JavaScript</p>
                    </div>
                    <div className="flex lg:space-x-5">
                      <AiFillCheckCircle className="text-amber-400 w-6 h-6" />
                      <p>Ruby</p>
                    </div>
                    <div className="flex lg:space-x-5">
                      <AiFillCheckCircle className="text-amber-400 w-6 h-6" />
                      <p>Rust</p>
                    </div>
                    <div className="flex lg:space-x-5">
                      <AiFillCheckCircle className="text-amber-400 w-6 h-6" />
                      <p>Go</p>
                    </div>
                    <div className="flex lg:space-x-5">
                      <AiFillCheckCircle className="text-amber-400 w-6 h-6" />
                      <p>OCaml</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-slate-200/60 min-h-screen mt-20">
          <div className="p-20 space-y-10">
            <h1 className="lg:text-5xl font-bold text-center">
              Their opinion about Peworld
            </h1>
            <TestimonyCarousel />
          </div>
        </section>
      </main>
    </Layout>
  );
}
