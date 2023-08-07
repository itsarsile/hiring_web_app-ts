import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import UserCards from "@/components/UserCards";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import useSWR from "swr";




export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("name");
  const { data, error, isLoading } = useSWR("/api/users", fetcher);
  const handleSearch = () => {
    
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="bg-primary">
        <div className="max-w-6xl mx-auto p-5">
          <h1 className="text-2xl -ml-2 text-white font-bold">Top Jobs</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10">
        {/* <SearchBar /> */}
        <div className="my-10">
            <UserCards />
        </div>
      </div>
    </Layout>
  );
}
