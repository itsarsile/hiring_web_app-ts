import { fetcher } from "@/lib/fetcher";
import { Image } from "@mantine/core";
import Link from "next/link";
import useSWR from "swr";

export default function UserCards() {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {data.users.map((user: any) => (
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
              styles={{
                image: {
                  borderRadius: "100%"
                }
              }}
            />
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-slate-400">{user.workerProfile?.currentJob}</p>
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
                {user.workerProfile?.province?.cities[0].name}
              </p>
              <div className="flex flex-wrap lg:flex-wrap lg:max-w-md lg:justify-start gap-2 justify-center">
                {/* {user.skills &&
                  Object.values(user.skills).map((skill) => (
                    <span className="badge badge-primary" key={skill}>
                      {skill}
                    </span>
                  ))} */}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Link href={`/profile/${user?.id}`}>
              <button className="btn-md flex-end rounded-md bg-violet-800 text-white btn">
                Lihat Profile
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
