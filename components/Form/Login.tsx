import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

function LoginForm() {
  const { status } = useSession()
  const router = useRouter()
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = loginForm.onSubmit(async (values, event) => {
    event.preventDefault()
    try {
      const response = await signIn("credentials", values);
      if (response?.error) {
          console.error("Error logging in", response?.error);
        } else {
          console.log("User logged in successfully");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  });

  if (status === "authenticated") {
    router.push("/home")
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            label="Email"
            placeholder="Masukkan email..."
            {...loginForm.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Masukkan password..."
            {...loginForm.getInputProps("password")}
          />
          <Button type="submit" className="bg-amber-500" variant="filled">
            Login
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default LoginForm;
