import { fetcher } from "@/lib/fetcher";
import { Avatar, Badge, Grid, Pagination } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function UserCards() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error } = useSWR(`/api/users?page=${currentPage}`, fetcher);
  const skillsArr = data?.users.map((user: any) => user.skills?.split(","));
  console.log(skillsArr);
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <div className="flex flex-col rounded-lg shadow-xl">
        {data && data.users ? (
          data.users.map((user: any) => (
            <div
              key={user.id}
              className="flex flex-col lg:flex-row p-10 items-center justify-between bordered"
            >
              <div className="flex flex-col lg:flex-row text-center lg:text-left items-center gap-2 space-x-2">
                <Avatar
                  src={user.photo}
                  radius="xl"
                  alt="avatar"
                  className="rounded-full object-cover w-24 h-24"
                />
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-sm text-slate-400">
                    {user.workerProfile?.currentJob}
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
                    {user?.domicile ? user.domicile : "Not yet set"}
                  </p>
                  <div className="flex flex-wrap lg:flex-wrap lg:max-w-md lg:justify-start gap-2 justify-center">
                    <Grid my="md" gutter="xs">
                    {user.skills?.split(",").map((skill: string) => (
                    <Grid.Col span="auto" key={skill}>
                      <Badge fullWidth key={skill} radius="md">
                        {skill}
                      </Badge>
                    </Grid.Col>
                  ))}
                    </Grid>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <Link href={`/profile/${user?.id}`}>
                  <button className="btn-md flex-end rounded-md bg-primary text-white btn">
                    Lihat Profile
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          total={data?.totalPages}
          value={currentPage}
          onChange={(newPage) => setCurrentPage(newPage)}
        />
      </div>
    </>
  );
}
