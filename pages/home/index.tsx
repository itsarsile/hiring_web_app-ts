import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";
import UserCards from "./UserCards";



export default function Home() {
  const router = useRouter();


  return (
    <Layout>
      <div className="bg-primary">
        <div className="max-w-6xl mx-auto p-5">
          <h1 className="text-2xl -ml-2 text-white font-bold">Top Jobs</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10">
        {/* Search Bar */}

        <div className="my-10">
          <div className="flex flex-col rounded-lg shadow-xl">
            {/* People Cards */}
            <UserCards />
            {/* {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col lg:flex-row p-10 items-center justify-between bordered"
              >
                <div className="flex flex-col lg:flex-row text-center lg:text-left items-center gap-2 space-x-2">
                  <Image
                    src={user.photo}
                    width={100}
                    height={100}
                    alt="avatar"
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-3">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-sm text-slate-400">{user.jobDesk}</p>
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
                      {user.workPlace}
                    </p>
                    <div className="flex flex-wrap lg:flex-wrap lg:max-w-md lg:justify-start gap-2 justify-center">
                      {user.skills.map((skill) => (
                        <span className="badge badge-primary" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button className="btn-md flex-end rounded-md bg-primary text-white btn">
                    <Link href={`/profile/${user.id}`}>Lihat Profile</Link>
                  </button>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-center my-5 text-white">
        <div className="join">
          {currentPage > 1 && (
            <button
              class="join-item btn btn-outline border-primary"
              onClick={() => handlePagination(currentPage - 1)}
            >
              {currentPage - 1}
            </button>
          )}
          <button class="join-item btn btn-active bg-primary">{currentPage}</button>
          {currentPage < totalUsers && (
            <button
              class="join-item btn btn-outline border-primary"
              onClick={() => handlePagination(currentPage + 1)}
            >
              {currentPage + 1}
            </button>
          )}
        </div>
      </div> */}
    </Layout>
  );
}

// export async function getServerSideProps({ query }) {
//   const page = parseInt(query.page) || 1;
//   try {
//     const totalUsersResponse = await fetch("http://localhost:5000/users");
//     const totalUsers = await totalUsersResponse.json();

//     const startIndex = (page - 1) * PAGE_SIZE;
//     const response = await fetch(
//       `http://localhost:5000/users?_limit=${PAGE_SIZE}&_start=${startIndex}`
//     );
//     const users = await response.json();


//     return {
//       props: {
//         users,
//         totalUsers: totalUsers.length,
//         currentPage: page,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching user data: ", error);
//     return {
//       notFound: true,
//     };
//   }
// }
