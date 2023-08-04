import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
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
  })
  
  const handleSubmit = workerForm.onSubmit((values) => {
      console.log(values)
  })

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
          <Button type="submit" className="bg-blue-500" variant="filled">
            Register
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default WorkerForm;
