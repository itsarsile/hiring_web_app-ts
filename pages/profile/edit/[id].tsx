import Layout from "@/components/Layout";
import { Container, Grid } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import UserBasicInfoEdit from "@/components/UserBasicInfoEdit";

import EditUser from '@/components/Form/EditUser'
export default function EditProfilePage({ user }: any) {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    router.push("/");
  }
  return (
    <Layout>
      <Container my="lg">
        <Grid grow>
          <Grid.Col lg={1} sm={1}>
              <UserBasicInfoEdit user={user} userRole={session?.user?.role}/>
          </Grid.Col>
          <Grid.Col lg={5} sm={1}>
            <EditUser user={user}  userRole={session?.user?.role}/>
            </Grid.Col>
        </Grid>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params || typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }
  const { id } = params;
  const userData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
  const user = await userData.json();
  return {
    props: {
      user,
    },
  };
};
