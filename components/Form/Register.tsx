import { Tabs } from "@mantine/core";
import RecruiterForm from "./RecruiterForm";
import WorkerForm from "./WorkerForm";
import Link from "next/link";
function RegisterForm() {
  return (
    <>
      <Tabs variant="pills" defaultValue="worker">
        <Tabs.List grow>
          <Tabs.Tab
            color="violet.6"
            className="outline outline-1 outline-violet-600 data-[active=true]:bg-violet-600"
            value="worker"
          >
            Worker
          </Tabs.Tab>
          <Tabs.Tab
            color="violet.6"
            className="outline outline-1 outline-violet-600 data-[active=true]:bg-violet-600"
            value="recruiter"
          >
            Recruiter
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="worker" pt="xs">
          <WorkerForm />
        </Tabs.Panel>
        <Tabs.Panel value="recruiter" pt="xs">
          <RecruiterForm />
        </Tabs.Panel>
      </Tabs>
      <span className="text-center">
        Anda sudah punya akun?{" "}
        <Link href="/auth/login" className="text-amber-400">
          Masuk disini
        </Link>
      </span>
    </>
  );
}

export default RegisterForm;
