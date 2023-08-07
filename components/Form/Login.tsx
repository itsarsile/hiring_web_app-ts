import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

function LoginForm() {
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = loginForm.onSubmit(async (values, event) => {
    try {
      const response = await signIn("credentials", {...values, callbackUrl: '/'});
      if (response?.error) {
        console.error("Error logging in", response?.error);
      } else {
        notifications.show({
          title: 'Login Successful',
          color: 'teal',
          message: 'User logged in successfully',
        })
        console.log("User logged in successfully");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  });

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
          <Button type="submit" className="bg-blue-500" variant="filled">
            Login
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default LoginForm;
