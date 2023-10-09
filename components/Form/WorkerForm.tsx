import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import axios from "axios";
function WorkerForm() {
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
      confirmPassword: (value, values) => {
        if (values.password !== values.confirmPassword) {
          return "Password tidak sama";
        }
      },
    },
  });

  const handleSubmit = workerForm.onSubmit(async (values) => {
    try {
      const response = await axios.post("/api/register", values);
      if (response.status === 201) {
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
          <TextInput
            {...workerForm.getInputProps("email")}
            placeholder="Masukkan email..."
            name="email"
            label="Email"
            withAsterisk
          />
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
          <PasswordInput
            {...workerForm.getInputProps("confirmPassword")}
            placeholder="Konfirmasi password Anda..."
            name="confirmPassword"
            label="Konfirmasi Password"
            withAsterisk
          />
          <Button type="submit" color="yellow.4" className="bg-amber-400">
            Register
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default WorkerForm;
