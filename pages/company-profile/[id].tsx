import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import avatarPlaceholder from "@/public/default.webp";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function CompanyProfile() {
  const router = useRouter();
  console.log(
    "🚀 ~ file: [id].tsx:9 ~ CompanyProfile ~ router:",
    router.query.id
  );
  const { data, isLoading, error } = useSWR(
    `/api/company-profile/${router.query.id}`,
    fetcher
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const profile = data && data.companyProfile;

  console.log("🚀 ~ file: [id].tsx:11 ~ CompanyProfile ~ data:", data);
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto py-10 relative">
        <div className="bg-violet-600 h-48 rounded-t-md"></div>
        <div className="absolute left-[31rem] top-[8rem]">
          <div className="avatar">
            <div className="w-36 rounded-xl">
              <img src={avatarPlaceholder.src} alt="avatr" />
            </div>
          </div>
        </div>
        <div className="bg-white h-full rounded-b-md shadow-xl pt-16">
          <div className="flex text-center items-center justify-center flex-col">
            <p className="font-medium text-2xl">{profile?.companyName}</p>
            <p>{profile?.companySegment}</p>
            <div className="flex text-slate-400 items-center gap-2">
              <MapPin className="w-4 h-4" />
              <p>Purwokerto, Jawa Tengah</p>
            </div>
            <div className="py-5 text-center text-slate-400 max-w-lg">
              {profile?.companyInfo}
            </div>
            <button onClick={() => router.push(`/company-profile/edit/${profile?.userId}`)} className="btn bg-violet-600 text-white rounded-md w-64">
              Edit Profile
            </button>
            <div className="pt-5 pb-10 text-slate-400 flex flex-col gap-3">
              <div className="flex gap-5 items-center">
                <Mail className="w-5 h-5" />
                <span>tokopaedi@gmail.com</span>
              </div>
              <div className="flex gap-5 items-center">
                <Instagram className="w-5 h-5" />
                <span>@tokopaedi</span>
              </div>
              <div className="flex gap-5 items-center">
                <Phone className="w-5 h-5" />
                <span>0812345678</span>
              </div>
              <div className="flex gap-5 items-center">
                <Linkedin className="w-5 h-5" />
                <span>@tokopaedi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
