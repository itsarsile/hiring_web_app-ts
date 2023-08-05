import Layout from "@/components/Layout";
import UserBasicInfo from "../../components/UserBasicInfo";
import { GetServerSideProps } from "next";
import axios from "axios";
import UserCatalogue from "@/components/UserCatalogue";
import { Container, Grid } from "@mantine/core";


export default function ProfilePage({ user }: any) {
  return (
    <Layout>
      <Container my="lg">
        <Grid grow>
          <Grid.Col lg={1} sm={1}>
              <UserBasicInfo user={user} />
          </Grid.Col>
          <Grid.Col lg={5} sm={1}>
              <UserCatalogue user={user}/>
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
  const userData = await fetch(`http://localhost:3000/api/users/${id}`);
  const user = await userData.json();
  return {
    props: {
      params,
      user,
    },
  };
};
