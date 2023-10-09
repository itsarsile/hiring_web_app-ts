import Layout from "@/components/Layout";
import UserCards from "./UserCards";

export default function Home() {

  return (
    <Layout>
      <div className="bg-violet-600">
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
