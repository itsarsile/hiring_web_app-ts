import Layout from "@/components/Layout";
import { fetcher } from "@/lib/fetcher";
import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

export default function HirePage() {
  const router = useRouter();
  const { data , isLoading } = useSWR(`/api/users/${router.query.id}`, fetcher)
  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(data)
  return (
    <Layout>
      <Container size="lg">
        <div>HirePage {router.query.id}</div>
      </Container>
    </Layout>
  );
}
