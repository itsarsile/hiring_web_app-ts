import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";
import UserCards from "@/components/UserCards";



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
        <div className="my-10">
          <div className="flex flex-col rounded-lg shadow-xl">
            <UserCards />
          </div>
        </div>
      </div>
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
