import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import { BsInstagram, BsEnvelope, BsGithub } from "react-icons/bs";

export default function ProfilePage({ userInfo, portfolioInfo, workExperienceInfo }) {
  return (
    <Layout>
      <div className="my-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center lg:place-items-start">
            <div className="flex flex-col gap-5">
              <div className="card w-80 bg-white shadow-lg bordered">
                <div className="card-body justify-center items-center">
                  <div className="avatar w-24">
                    <Image
                      src={userInfo.photo}
                      width={110}
                      height={110}
                      alt="avatar"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 mt-2 w-full text-center lg:text-left">
                    <h1 className="font-bold">{userInfo.name}</h1>
                    <p className="text-slate-400 text-sm">{userInfo.domicile}</p>
                    <p className="flex items text-sm gap-2 text-slate-400 lg:justify-start justify-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                      </span>
                      {userInfo.workPlace}
                    </p>
                    <p className="text-slate-400 text-sm">Freelancer</p>
                    <p className="text-slate-400 text-sm mt-2">
                      {userInfo.bio}
                    </p>
                  </div>
                </div>
                <div className="card-body gap-5">
                  <div className="card-title">Skill</div>
                  <div className="flex gap-2 flex-nowrap">
                  {userInfo.skills.map((skill) => (
                    <span key={skill} className="badge badge-primary">{skill}</span>
                  ))}
                  </div>
                  <div className="text-slate-400">
                    <div className="flex flex-col space-y-2">
                      <div className="grid grid-cols-3 text-right">
                        <BsEnvelope className="w-6 h-6 col-span-1" />
                        <p className="col-span-2">{userInfo.socialMediaAccounts.email}</p>
                      </div>
                      <div className="grid grid-cols-3 text-right">
                        <BsInstagram className="w-6 h-6 col-span-1 " />
                        <p className="col-span-2">{userInfo.socialMediaAccounts.instagram}</p>
                      </div>
                      <div className="grid grid-cols-3 text-right">
                        <BsGithub className="w-6 h-6 col-span-1" />
                        <p className="col-span-2">{userInfo.socialMediaAccounts.github}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 col-span-2 w-full h-full">
              {/* Portfolio */}
              <div className="card w-80 mx-auto mt-10 lg:mt-0 lg:w-full bg-white shadow-lg bordered">
                <div className="card-body">
                  <div className="card-title text-lg lg:text-2xl font-bold ">
                    Portofolio
                  </div>
                  <div className="divider w-full"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {portfolioInfo.map((portfolio) => (
                    <div key={portfolio.id} className="flex flex-col text-center gap-5">
                      <a href={portfolio.linkRepo} target="_blank">
                      <Image
                        src={portfolio.linkImage}
                        width={220}
                        height={150}
                        alt="portfolio thumbnail"
                        className="rounded-md shadow-md"
                      />
                      </a>
                      <p>{portfolio.title}</p>
                    </div>
                  ))}
                  </div>
                  <div className="card-title mt-10 text-lg lg:text-2xl font-bold ">
                    Pengalaman Kerja
                  </div>
                  <div className="divider w-full"></div>
                  {workExperienceInfo.map((workExperience) => (
                  <div className="flex flex-col gap-2" key={workExperience.id}>
                    <p className="font-bold text-md">{workExperience.title}</p>
                    <p>{workExperience.company}</p>
                    <p className="text-sm text-slate-400">
                      {workExperience.startDate} - {workExperience.endDate}
                    </p>
                    <p className="mt-3">
                      {workExperience.description}
                    </p>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    const [userResponse, portfolioResponse, workExperienceResponse] =
      await Promise.all([
        fetch(`http://localhost:5000/users/${id}`),
        fetch(`http://localhost:5000/users/${id}/portfolio`),
        fetch(`http://localhost:5000/users/${id}/workExperience`),
      ]);

    const userInfo = await userResponse.json();
    const portfolioInfo = await portfolioResponse.json();
    const workExperienceInfo = await workExperienceResponse.json();
    console.log(userInfo.socialMediaAccounts)
    delete userInfo.password;

    return {
      props: {
        userInfo,
        portfolioInfo,
        workExperienceInfo,
      },
    };
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return {
      notFound: true,
    };
  }
}
