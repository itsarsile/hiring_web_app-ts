import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
function WorkerForm() {
  const { status } = useSession();
  const router = useRouter();
  const workerForm = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      roles: "WORKER",
    },
    validate: {
      name: hasLength({ min: 2, max: 50 }),
      password: hasLength({ min: 8, max: 50 }),
      confirmPassword: (value, values) => {
        if (values.password !== values.confirmPassword) {
          return "Password tidak sama";
        }
      },
      email: isEmail(),
    },
  });

  if (status === "authenticated") {
    router.push("/home");
  }
  const handleSubmit = workerForm.onSubmit(async (values) => {
    try {
      const response = await axios.post("/api/register", values);
      if (response.status === 201) {
        console.log("User created successfully");
        notifications.show({
          title: "Register Successful",
          color: "teal",
          message: "User registered successfully",
        });
        await signIn('credentials', values)
        console.log("User created successfully");
      }
    } catch (error) {
      console.error("Error creating user", error);
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            {...workerForm.getInputProps("name")}
            placeholder="Masukkan nama lengkap..."
            name="name"
            label="Nama Lengkap"
            withAsterisk
          />
          {workerForm.errors.name && (
            <div className="text-red-500 text-sm">Nama harus lebih dari 2</div>
          )}
          <TextInput
            {...workerForm.getInputProps("email")}
            placeholder="Masukkan email..."
            name="email"
            label="Email"
            withAsterisk
          />
          {workerForm.errors.email && (
            <div className="text-red-500 text-sm">Harus berupa email</div>
          )}
          <TextInput
            {...workerForm.getInputProps("phone")}
            placeholder="Masukkan nomor telepon..."
            name="phone"
            label="Nomor Telepon"
            withAsterisk
          />
          <PasswordInput
            {...workerForm.getInputProps("password")}
            placeholder="Masukkan password"
            name="password"
            label="Password"
            withAsterisk
          />
          {workerForm.errors.password && (
            <div className="text-red-500 text-sm">Password minimal 8 kata</div>
          )}
          <PasswordInput
            {...workerForm.getInputProps("confirmPassword")}
            placeholder="Konfirmasi password Anda..."
            name="confirmPassword"
            label="Konfirmasi Password"
            withAsterisk
          />
          {workerForm.errors.confirmPassword && (
            <div className="text-red-500">
              {workerForm.errors.confirmPassword}
            </div>
          )}
          <Button type="submit" className="bg-blue-500" variant="filled">
            Register
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default WorkerForm;
