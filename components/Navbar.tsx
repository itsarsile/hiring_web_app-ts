import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const handleSignOut = async () => {
      await signOut();
      router.push("/")
  }

  const { data: session, status } = useSession();
  return (
    <div className="navbar">
      <div className="navbar-start">
      <Link href="/home">
        <Image src="/logo-purple.svg" width={80} height={24} alt="logo" />
      </Link>
      </div>
      <div className="navbar-end space-x-5">
        {status === "unauthenticated" ? (
          <button
            className="btn btm-nav-sm rounded-md text-white bg-primary"
            onClick={() => signIn("credentials")}
          >
            Masuk sebagai pekerja
          </button>
        ) : status === "loading" ? (
          <span>Loading...</span>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 stroke-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 stroke-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <div className="dropdown dropdown-bottom dropdown-end">
              <div className="avatar cursor-pointer hover:ring-primary">
                <div className="w-8 rounded-full">
                  <Image
                    src={session?.user?.photo || ""}
                    width={80}
                    height={80}
                    alt="avatar"
                    tabIndex={0}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                <Link href={`/profile/${session?.user?.id}`}>Profile</Link>
                <Link href={`/profile/edit/${session?.user?.id}`}>Edit Profile</Link>
                </li>
                <li>
                <button onClick={handleSignOut}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
