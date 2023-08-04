import Layout from "@/components/layout";
import axios from "axios";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function EditProfilePage({ workExperienceInfo, userInfo }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  let user = session?.user;
  if (status === "unauthenticated") {
    router.push("/");
  }
  const handleSaveWorkExperience = async (values) => {
    try {
      setIsSubmitting(true);
      const response = await axios.patch(
        `http://localhost:5000/workExperience/${values.id}`,
        values
      );
      if (response.status === 200) {
        console.log("Work experience updated successfully");
        router.reload();
      }
    } catch (error) {
      console.error("Error updating work experience", error);
    } finally {
      setIsSubmitting(false);
      setSelectedWorkExperience(null); 
    }
  };
  const handleEditWorkExperience = (workExperience) => {
    setSelectedWorkExperience(workExperience);
  };
  const basicInfoForm = useFormik({
    initialValues: {
      ...userInfo,
    },
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await axios.patch(
          `http://localhost:5000/users/${user?.id}`,
          values
        );

        if (response.status === 200) {
          console.log("User data updated successfully");
          router.reload();
          toast.success("Profile updated successfully!");
        }
      } catch (error) {
        console.error("Error updating user", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const skillsForm = useFormik({
    initialValues: {
      skills: userInfo?.skills.join(", ") || "",
    },
    onSubmit: async (values) => {
      try {
        const skillsArray = values.skills
          .split(",")
          .map((skill) => skill.trim());

        const response = await axios.patch(
          `http://localhost:5000/users/${user?.id}`,
          { skills: skillsArray }
        );
        if (response.status === 200) {
          console.log("User skills updated successfully");
          router.reload()
        }
      } catch (error) {
        console.error("Error updating user skills", error);
      }
    },
  });

  const workExperienceForm = useFormik({
    initialValues: {
      userId: userInfo.id,
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          `http://localhost:5000/workExperience`,
          values
        );
        if (response.status === 200) {
          console.log("Work experience added successfully");
          router.reload();
        }
      } catch (error) {
        console.error("Error adding work experience", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const portfolioForm = useFormik({
    initialValues: {
      title: "",
      linkRepo: "",
      linkImage: "",
      userId: userInfo?.id,
    },
    onSubmit: async (values) => {
      console.log(userInfo?.id);
      values.userId = userInfo?.id;
      try {
        const response = await axios.post(
          `http://localhost:5000/portfolio`,
          values
        );
        if (response.status === 200) {
          console.log("Portfolio added successfully");
        }
      } catch (error) {
        console.error("Error adding portfolio", error);
      }
    },
  });

  const handleDelete = async (endpoint, id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/${endpoint}/${id}`
      );

      if (response.status === 200) {
        console.log(`${endpoint} with ${id} successfully deleted`);
        router.reload();
      }
    } catch (error) {
      console.log(`Error while deleting ${endpoint} with ${id}:`, error);
    }
  };

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
                      className="rounded-full"
                      src={userInfo?.photo}
                      width={110}
                      height={110}
                      alt="avatar"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-2 mt-2">
                    <h1 className="font-medium">{userInfo?.name}</h1>
                    <p className="text-slate-400 text-sm">
                      {userInfo?.workPlace}
                    </p>
                    <p className="flex items-center text-sm gap-2 text-slate-400 lg:justify-start justify-center">
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
                      {userInfo?.domicile}
                    </p>
                    <p className="text-slate-400 text-sm">{userInfo?.bio}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 col-span-2 w-full h-full">
              {/* Data Diri */}
              <div className="card w-fit mx-auto mt-10 lg:mt-0 lg:w-full bg-white shadow-lg bordered">
                <div className="card-body">
                  <div className="card-title text-2xl font-bold">Data Diri</div>
                  <div className="divider w-full"></div>
                  <div className="">
                    <form
                      onSubmit={basicInfoForm.handleSubmit}
                      className="form-control"
                    >
                      <label htmlFor="" className="label text-slate-400">
                        Nama
                      </label>
                      <input
                        name="name"
                        value={basicInfoForm.values.name}
                        onChange={basicInfoForm.handleChange}
                        type="text"
                        className="input input-bordered"
                        placeholder="Masukkan nama lengkap"
                      />
                      <label htmlFor="" className="label text-slate-400">
                        Job Desk
                      </label>
                      <input
                        name="jobDesk"
                        value={basicInfoForm.values.jobDesk}
                        onChange={basicInfoForm.handleChange}
                        type="text"
                        className="input input-bordered"
                        placeholder="Masukkan job desk"
                      />
                      <label htmlFor="" className="label text-slate-400">
                        Domisili
                      </label>
                      <input
                        name="domicile"
                        value={basicInfoForm.values.domicile}
                        onChange={basicInfoForm.handleChange}
                        type="text"
                        className="input input-bordered"
                        placeholder="Masukkan domisili"
                      />
                      <label htmlFor="" className="label text-slate-400">
                        Tempat Kerja
                      </label>
                      <input
                        name="workPlace"
                        value={basicInfoForm.values.workPlace}
                        onChange={basicInfoForm.handleChange}
                        type="text"
                        className="input input-bordered"
                        placeholder="Masukkan tempat kerja"
                      />
                      <label htmlFor="" className="label text-slate-400">
                        Deskripsi singkat
                      </label>
                      <textarea
                        value={basicInfoForm.values.bio}
                        onChange={basicInfoForm.handleChange}
                        name="bio"
                        cols="30"
                        rows="10"
                        className="textarea textarea-bordered"
                      ></textarea>
                      <button
                        className="btn btn-block bg-primary text-white mt-5"
                        type="submit"
                      >
                        {isSubmitting ? (
                          <span className="loading loading-dots loading-md"></span>
                        ) : (
                          "Simpan"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* Skill */}
              <div className="card w-full bg-white shadow-lg bordered">
                <div className="card-body">
                  <div className="card-title text-2xl font-bold">Skill</div>
                  <div className="divider w-full"></div>
                  <div className="">
                    <form
                      onSubmit={skillsForm.handleSubmit}
                      className="form-control"
                    >
                      <div className="join">
                        <input
                          name="skills"
                          value={skillsForm.values.skills}
                          onChange={skillsForm.handleChange}
                          type="text"
                          className="input input-bordered join-item w-full"
                          placeholder="HTML, JS, CSS..."
                        />
                        <button
                          type="submit"
                          className="btn bg-primary text-white join-item"
                        >
                          Simpan
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Pengalaman Kerja */}
              <div className="card w-full bg-white shadow-lg bordered">
                <div className="card-body">
                  <div className="card-title text-2xl font-bold">
                    Pengalaman Kerja
                  </div>
                  <div className="divider w-full"></div>
                  {workExperienceInfo.map((workExperience) => (
                    <div
                      className="flex flex-col gap-2 relative"
                      key={workExperience.id}
                    >
                      <p className="font-bold text-md">
                        {workExperience.title}
                      </p>
                      <p>{workExperience.company}</p>
                      <p className="text-sm text-slate-400">
                        {workExperience.startDate} - {workExperience.endDate}
                      </p>
                      <p className="mt-3">{workExperience.description}</p>
                      <div className="absolute right-0 space-x-2">
                        <button
                          onClick={() =>
                            handleDelete("workExperience", workExperience.id)
                          }
                          className="btn btn-sm btn-error w-16 rounded-md"
                        >
                          X
                        </button>
                        <div
                          className="btn btn-sm btn-warning w-16 rounded-md"
                        >
                          Edit
                        </div>
                      </div>
                      <div className="divider w-full"></div>
                    </div>
                  ))}
                  <div className="">
                    <form
                      onSubmit={workExperienceForm.handleSubmit}
                      className="form-control gap-3"
                    >
                      <label htmlFor="" className="label text-slate-400">
                        Title
                      </label>
                      <input
                        value={workExperienceForm.values.title}
                        onChange={workExperienceForm.handleChange}
                        name="title"
                        type="text"
                        className="input input-bordered"
                        placeholder="Masukkan title"
                      />
                      <div className="join join-vertical lg:join-horizontal gap-3">
                        <div className="join-item">
                          <label htmlFor="" className="label text-slate-400 ">
                            Nama Perusahaan
                          </label>
                          <input
                            onChange={workExperienceForm.handleChange}
                            value={workExperienceForm.values.company}
                            name="company"
                            type="text"
                            className="input input-bordered w-full lg:w-[20rem]"
                            placeholder="PT. Cinta Sejati..."
                          />
                        </div>
                        <div className="join-item">
                          <label htmlFor="" className="label text-slate-400">
                            Dari
                          </label>
                          <input
                            onChange={workExperienceForm.handleChange}
                            name="startDate"
                            value={workExperienceForm.values.startDate}
                            type="date"
                            className="input input-bordered w-full"
                            placeholder="e.g 2018"
                          />
                        </div>
                        <div className="join-item">
                          <label htmlFor="" className="label text-slate-400">
                            Sampai
                          </label>
                          <input
                            onChange={workExperienceForm.handleChange}
                            value={workExperienceForm.values.endDate}
                            name="endDate"
                            type="date"
                            className="input input-bordered w-full"
                            placeholder="e.g 2023"
                          />
                        </div>
                      </div>
                      <label htmlFor="" className="label text-slate-400">
                        Deskripsi singkat
                      </label>
                      <textarea
                        onChange={workExperienceForm.handleChange}
                        name="description"
                        id=""
                        cols="30"
                        rows="10"
                        className="textarea textarea-bordered"
                        placeholder="Deskripsi singkat mengenai pekerjaan Anda"
                      ></textarea>
                      <button
                        className="btn btn-block bg-primary text-white mt-5"
                        type="submit"
                      >
                        {isSubmitting ? (
                          <span className="loading loading-dots loading-md"></span>
                        ) : (
                          "Tambah Pengalaman Kerja"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* Portofolio */}
              <div className="card w-full bg-white shadow-lg bordered">
                <div className="card-body">
                  <div className="card-title text-2xl font-bold">
                    Portofolio
                  </div>
                  <div className="divider w-full"></div>
                  <div className="">
                    <form
                      onSubmit={portfolioForm.handleSubmit}
                      className="form-control gap-3"
                    >
                      <label htmlFor="" className="label text-slate-400">
                        Nama aplikasi
                      </label>
                      <input
                        name="title"
                        value={portfolioForm.values.title}
                        onChange={portfolioForm.handleChange}
                        type="text"
                        className="input input-bordered"
                        placeholder="Masukkan nama aplikasi"
                      />
                      <label htmlFor="" className="label text-slate-400 ">
                        Link repository
                      </label>
                      <input
                        name="linkRepo"
                        value={portfolioForm.values.linkRepo}
                        onChange={portfolioForm.handleChange}
                        type="text"
                        className="input input-bordered w-full "
                        placeholder="Link github/website"
                      />
                      <label htmlFor="" className="label text-slate-400 ">
                        Link Image
                      </label>

                      <input
                        name="linkImage"
                        value={portfolioForm.values.linkImage}
                        onChange={portfolioForm.handleChange}
                        type="text"
                        className="input input-bordered w-full "
                        placeholder="Image link"
                      />
                      <div className="divider"></div>
                      <button
                        type="submit"
                        className="btn btn-block bg-primary text-white"
                      >
                        Tambah portfolio
                      </button>
                    </form>
                  </div>
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
    const userInfoResponse = await fetch(`http://localhost:5000/users/${id}`);
    const [workExperienceResponse] = await Promise.all([
      fetch(`http://localhost:5000/users/${id}/workExperience`),
    ]);
    const userInfo = await userInfoResponse.json();
    console.log(userInfo);
    const workExperienceInfo = await workExperienceResponse.json();
    console.log(workExperienceInfo);
    return {
      props: {
        workExperienceInfo,
        userInfo,
      },
    };
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return {
      notFound: true,
    };
  }
}
