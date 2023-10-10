import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  MultiSelect,
  Paper,
  Radio,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { DatesProvider, DatePickerInput } from "@mantine/dates";
import "dayjs/locale/id";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import { FiImage, FiUpload, FiX } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useDisclosure } from "@mantine/hooks";

const developerSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Ruby",
  "SQL",
  "MongoDB",
  "Git",
  "TypeScript",
  "Vue.js",
  "Angular",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Redux",
  "GraphQL",
  "REST API",
  "Webpack",
  "Jest",
  "Testing Library",
  "CI/CD",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "Agile",
  "Scrum",
  "DevOps",
];
function EditUser({ user }: any) {
  const userId = user?.user?.id;
  return (
    <>
      <Stack>
        <Paper shadow="md" p="md" withBorder radius="md">
          <Container>
            <Stack>
              <p className="text-xl font-semibold">Data diri</p>
              <Divider />
              <BasicInfoForm userId={userId} />
            </Stack>
          </Container>
        </Paper>
        <Paper shadow="md" p="md" withBorder radius="md">
          <Container>
            <Stack>
              <p className="text-xl font-semibold">Skills</p>
              <Divider />
              <SkillInfoForm userId={userId} />
            </Stack>
          </Container>
        </Paper>
        <Paper shadow="md" p="md" withBorder radius="md">
          <Container>
            <Stack>
              <DisplayWorkExperience userId={userId} />
              <p className="text-xl font-semibold">Pengalaman Kerja</p>
              <Divider />
              <WorkExperienceForm userId={userId} />
            </Stack>
          </Container>
        </Paper>
        <Paper shadow="md" p="md" withBorder radius="md">
          <Container>
            <Stack>
              <p className="text-xl font-semibold">Portfolio</p>
              <Divider />
              <PortfolioForm userId={userId} />
            </Stack>
          </Container>
        </Paper>
      </Stack>
    </>
  );
}

export default EditUser;

function DisplayWorkExperience({ userId }: any) {
  const { data: workExperiences, error } = useSWR(
    `/api/work-experience/user/${userId}`,
    fetcher
  );
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
    });
  };
  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const years = end.getUTCFullYear() - start.getUTCFullYear();
    const months = end.getUTCMonth() - start.getUTCMonth();

    return `${years} year${years !== 1 ? "s" : ""} ${months} month${
      months !== 1 ? "s" : ""
    }`;
  };

  return (
    <>
      {workExperiences &&
        workExperiences.map((workExperience: any) => (
          <Stack key={workExperience.experienceId} spacing="sm">
            <Title order={5}>{workExperience.experience.position}</Title>
            <p className="text-slate-400">
              {workExperience.experience.companyName}
            </p>
            <div className="text-slate-400 text-sm flex flex-col gap-2">
              <span>
                {formatDate(workExperience.experience.startAt)} -{" "}
                {formatDate(workExperience.experience.endedAt)}
              </span>
              <span className="text-xs">
                {calculateDuration(
                  workExperience.experience.startAt,
                  workExperience.experience.endedAt
                )}
              </span>
            </div>

            <p className="text-sm">{workExperience.experience.description}</p>
          </Stack>
        ))}
      <Divider />
    </>
  );
}

function BasicInfoForm({ userId }: any) {
  const { data } = useSWR(`/api/users/${userId}`, fetcher);
  const userData = data && data?.user;
  const form = useForm({
    initialValues: {
      name: "",
      currentJob: "",
      domicile: "",
      workPlace: "",
      bio: "",
    },
  });

  const onSubmit = form.onSubmit(async (values, _e) => {
    try {
      console.log(values)
      const res = await axios.put(`/api/users/${userId}`, values)

      if (res.status === 201 ) {
        alert("Success submitting!")
      }
    } catch (error) {
      alert("Error submitting");
    }
  });

  useEffect(() => {
    if (userData) {
      form.setValues({
        name: userData.name,
        currentJob: userData?.workerProfile?.currentJob,
        bio: userData.bio,
        workPlace: userData.workerProfile?.workPlace,
      });
    }
  }, [data]);

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <TextInput
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap..."
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Job Desk"
          placeholder="Masukkan job desk..."
          {...form.getInputProps("currentJob")}
        />
        <TextInput
          label="Domisili"
          placeholder="Masukkan domisili..."
          {...form.getInputProps("domicile")}
        />
        <TextInput
          label="Tempat Kerja"
          placeholder="Masukkan Tempat Kerja..."
          {...form.getInputProps("workPlace")}
        />
        <Textarea
          label="Bio"
          placeholder="Ceritakan tentang diri Anda..."
          {...form.getInputProps("bio")}
        />
        <Button type="submit" className="bg-violet-600" color="violet.6">
          Simpan
        </Button>
      </Stack>
    </form>
  );
}

function SkillInfoForm({ userId }: any) {
  const { data } = useSWR(`/api/skill/user/${userId}`, fetcher);
  const skillForm = useForm({
    initialValues: {
      skills: [],
    },
  });

  useEffect(() => {
    if (data) {
      const skillsArr = data.skills ? data[0].skills.split(", ") : []
      skillForm.setValues({
        skills: skillsArr,
      });
    }
  }, [data]);

  const handleSubmit = skillForm.onSubmit(async (values) => {
    try {
      const response = await axios.patch(`/api/skill/user/${userId}`, values);
      if (response.status === 200) {
        console.log("Success added skill");
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid grow>
        <Grid.Col lg={9} md={8} sm={3}>
          <MultiSelect
            data={developerSkills}
            placeholder="Masukkan skill..."
            {...skillForm.getInputProps("skills")}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <Button color="violet.6" variant="outline" type="submit">
            Simpan
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}

function WorkExperienceModal() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Modal opened={opened} onClose={close} title="Edit Work Experience"></Modal>
  );
}

function WorkExperienceForm({ userId }: any) {
  const form = useForm({
    initialValues: {
      companyName: "",
      description: "",
      position: "",
      startAt: null,
      endedAt: null,
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const response = await axios.post(
        `/api/work-experience/user/${userId}`,
        values
      );
      if (response.status === 200) {
        form.reset();
        console.log("Success added work experience");
      }
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Posisi"
          placeholder="Masukkan posisi..."
          {...form.getInputProps("position")}
        />
        <Grid>
          <Grid.Col lg={4}>
            <TextInput
              label="Nama Perusahaan"
              placeholder="Masukkan nama perusahaan..."
              {...form.getInputProps("companyName")}
            />
          </Grid.Col>
          <DatesProvider settings={{ locale: "id" }}>
            <Grid.Col lg={4}>
              <DatePickerInput
                label="Mulai"
                placeholder="Pilih tanggal mulai"
                {...form.getInputProps("startAt")}
              />
            </Grid.Col>
            <Grid.Col lg={4}>
              <DatePickerInput
                label="Selesai"
                placeholder="Pilih tanggal selesai"
                {...form.getInputProps("endedAt")}
              />
            </Grid.Col>
          </DatesProvider>
        </Grid>
        <Textarea
          label="Deskripsi"
          placeholder="Masukkan deskripsi..."
          {...form.getInputProps("description")}
        />
        <Divider />
        <Button variant="outline" color="violet.6" type="submit">
          Simpan
        </Button>
      </Stack>
    </form>
  );
}

function PortfolioForm({ userId }: any) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const previews = uploadedFiles.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        alt=""
      />
    );
  });
  const form = useForm({
    initialValues: {
      title: "",
      link: "",
      types: null,
      photo: "",
    },
  });

  const handleSubmit = form.onSubmit(async (values, event) => {
    try {
      for (const file of uploadedFiles) {
        console.log(file);
        const { data, error } = await supabase.storage
          .from("portfolio")
          .upload(file.name, file);

        // Retrieve image URL
        if (data) {
          const { data: publicUrl } = supabase.storage
            .from("portfolio")
            .getPublicUrl(data?.path);
          values.photo = publicUrl.publicUrl;
        }
      }
      const response = await axios.post(
        `/api/portfolio/user/${userId}`,
        values
      );
      console.log(values);
      if (response.status === 201) {
        console.log("Portfolio created successfully");
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Nama Aplikasi"
            placeholder="Masukkan nama aplikasi..."
            {...form.getInputProps("title")}
          />
          <TextInput
            label="Link Repository"
            placeholder="Masukkan link repository..."
            {...form.getInputProps("link")}
          />
          <Radio.Group
            label="Pilih Jenis Aplikasi"
            withAsterisk
            {...form.getInputProps("types")}
          >
            <Group mt="md">
              <Radio value="mobile" label="Aplikasi Mobile" />
              <Radio value="web" label="Aplikasi Web" />
            </Group>
          </Radio.Group>
          <Dropzone
            onDrop={(files) => setUploadedFiles(files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group position="center" spacing="xl" className="min-h-16">
              <Dropzone.Accept>
                <FiUpload />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <FiX />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <FiImage />
              </Dropzone.Idle>
              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
              </div>
            </Group>
          </Dropzone>
          {previews}
          <Divider />
          <Button variant="outline" color="violet.6" type="submit">
            Tambah Portfolio
          </Button>
        </Stack>
      </form>
    </>
  );
}
