import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Menu,
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

import { fetcher } from "@/lib/fetcher";
import { supabase } from "@/lib/supabase";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import "dayjs/locale/id";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FiEdit,
  FiGithub,
  FiImage,
  FiSettings,
  FiUpload,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import useSWR, { mutate } from "swr";

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
function EditUser({ user, userRole }: any) {
  const userId = user?.user?.id;
  // console.log(user);
  return (
    <>
      <Stack>
        {userRole === "WORKER" && (
          <>
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
                  <DisplayPortfolio userId={userId} />
                  <p className="text-xl font-semibold">Portfolio</p>
                  <Divider />
                  <PortfolioForm userId={userId} />
                </Stack>
              </Container>
            </Paper>
          </>
        )}
        {userRole === "RECRUITER" && (
          <>
            <Paper shadow="md" p="md" withBorder radius="md">
              <Container>
                <Stack>
                  <p className="text-xl font-semibold">Data diri</p>
                  <Divider />
                  <BasicRecruiterForm userId={userId} />
                </Stack>
              </Container>
            </Paper>
          </>
        )}
      </Stack>
    </>
  );
}

export default EditUser;

function DisplayWorkExperience({ userId }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: workExperiences } = useSWR(
    `/api/work-experience/user/${userId}`,
    fetcher
  );
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
    });
  };

  const handleDelete = async (experienceId: number) => {
    try {
      const response = await axios.delete(
        `/api/work-experience/work/${experienceId}`
      );
      if (response.status === 200) {
        notifications.show({
          message: "Work Experience Deleted Successfuly",
          title: "Work Experience Deleted",
          color: "green",
        })
        mutate(`/api/work-experience/user/${userId}`);
      }
    } catch (error) {
      console.error("Error during work experience deletion:", error);
    }
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
          <div className="relative" key={workExperience.experienceId}>
            <Stack spacing="sm">
              <Menu shadow="md" position="left-start" withArrow width={200}>
                <Menu.Target>
                  <ActionIcon
                    variant="outline"
                    color="blue"
                    className="absolute right-0"
                  >
                    <FiSettings />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Work Experience Settings</Menu.Label>
                  <Menu.Item
                    icon={<FiEdit />}
                    fz="sm"
                    color="yellow"
                    onClick={() => open()}
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    icon={<FiXCircle />}
                    fz="sm"
                    color="red"
                    onClick={() => handleDelete(workExperience.experience.id)}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
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
            <Divider mt="md" />
            <WorkExperienceModal
              opened={opened}
              onClose={close}
              userId={userId}
            />
          </div>
        ))}
    </>
  );
}

function PortfolioModal({ opened, onClose, userId }: any) {
  const { data } = useSWR(`/api/portfolio/user/${userId}`, fetcher);
  const portfolio = data && data[0].portfolio;

  const form = useForm({
    initialValues: {
      portfolioId: portfolio.id,
      title: portfolio.title,
      link: portfolio.link,
      types: portfolio.types,
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const response = await axios.patch(
        `/api/portfolio/user/${userId}`,
        values
      );
      if (response.status === 200) {
        mutate("/api/portfolio/user/" + userId);
        notifications.show({
          title: "Portfolio Updated",
          color: "teal",
          message: "Portfolio updated successfully",
        })
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Modal opened={opened} onClose={onClose} title="Edit Port">
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
          <Divider />
          <Button variant="outline" color="blue" type="submit">
            Simpan
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
function DisplayPortfolio({ userId }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: portfolios } = useSWR(`/api/portfolio/user/${userId}`, fetcher);
  const handleDelete = async (portfolioId: number) => {
    try {
      const response = await axios.delete(
        `/api/portfolio/${portfolioId}`
      );
      if (response.status === 200) {
        console.log("Success deleted work experience");
        mutate(`/api/portfolio/user/${userId}`);
      }
    } catch (error) {
      console.error("Error during work experience deletion:", error);
    }
  };

  return (
    <>
      {portfolios &&
        portfolios.map((portfolios: any) => (
          <div className="relative" key={portfolios.portfolioId}>
            <Stack>
            <Menu shadow="md" position="left-start" withArrow width={200}>
                <Menu.Target>
                  <ActionIcon
                    variant="outline"
                    color="blue"
                    className="absolute right-0"
                  >
                    <FiSettings />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Portfolio Settings</Menu.Label>
                  <Menu.Item
                    icon={<FiEdit />}
                    fz="sm"
                    color="yellow"
                    onClick={() => open()}
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    icon={<FiXCircle />}
                    fz="sm"
                    color="red"
                    onClick={() => handleDelete(portfolios.portfolio.id)}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Group>
                <Image
                  src={portfolios.portfolio.photo}
                  width={200}
                  height={100}
                  alt="portfolio photo"
                  className="object-cover"
                  radius="md"
                />
                <Stack spacing="xs">
                <Text fw="bold" fz="lg">{portfolios.portfolio.title}</Text>
                <Text transform="uppercase">{portfolios.portfolio.types}</Text>

                <Group spacing="xs" >
                <FiGithub />
                <Text component="a" underline color="blue" href={portfolios.portfolio.link} target="_blank">Go to repository</Text>
                </Group>
                </Stack>
              </Group>
            </Stack>
            <Divider mt="md" />
            <PortfolioModal 
              opened={opened}
              onClose={close}
              userId={userId}
            />
          </div>
        ))}
    </>
  );
}

function BasicInfoForm({ userId }: any) {
  const { data } = useSWR(`/api/users/${userId}`, fetcher);
  const router = useRouter();
  const userData = data && data?.user;
  const form = useForm({
    initialValues: {
      name: "",
      currentJob: "",
      workPlace: "",
      domicile: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        name: userData.name || "",
        currentJob: userData.workerProfile?.currentJob || "",
        domicile: userData?.domicile || "",
        workPlace: userData.workerProfile?.workPlace || "",
        bio: userData?.bio || "",
      });
    }
  }, [data]);

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const response = await axios.patch(`/api/users/${userId}`, values);
      if (response.status === 200) {
        console.log("Success added skill");
        notifications.show({
          title: "Update Successful",
          color: "teal",
          message: "User updated successfully",
        });
        mutate(`/api/users/${userId}`);
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
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
        <Button type="submit" variant="outline">
          Simpan
        </Button>
      </Stack>
    </form>
  );
}

function BasicRecruiterForm({ userId }: any) {
  const { data } = useSWR(`/api/users/recruiter-profile/${userId}`, fetcher);
  const company = data?.company
  const router = useRouter();
  const form = useForm({
    initialValues: {
      companyName: "",
      companySegment: "",
      companyDomicile: "",
      companyInfo: "",
      companyEmail: "",
      companyPhone: ""
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        companyName: company?.companyName,
        companySegment: company?.companySegment,
        companyDomicile: company?.companyDomicile,
        companyInfo: company?.companyInfo,
        companyEmail: company?.companyEmail,
        companyPhone: company?.companyPhone,
      });
    }
  }, [data]);

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const response = await axios.patch(
        `/api/users/recruiter-profile/${userId}`,
        values
      );
      if (response.status === 201) {
        notifications.show({
          title: "Update Successful",
          color: "teal",
          message: "User updated successfully",
        })
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Nama perusahaan"
          placeholder="Masukkan nama perusahaan..."
          {...form.getInputProps("companyName")}
        />
        <TextInput
          label="Bidang"
          placeholder="Masukkan bidang..."
          {...form.getInputProps("companySegment")}
        />
        <TextInput
          label="Domisili"
          placeholder="Masukkan domisili..."
          {...form.getInputProps("companyDomicile")}
        />
        <Textarea
          label="Deskripsi Perusahaan"
          placeholder="Ceritakan tentang perusahaan Anda..."
          {...form.getInputProps("companyInfo")}
        />
        <TextInput
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon..."
          {...form.getInputProps("companyPhone")}
        />
        <TextInput
          label="Email Perusahaan"
          placeholder="Masukkan email perusahaan..."
          {...form.getInputProps("companyEmail")}
        />
        <Button type="submit" variant="outline">
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
      const skillsArr = data[0].skills?.split(", ");
      skillForm.setValues({
        skills: skillsArr,
      });
    }
  }, [data]);

  const handleSubmit = skillForm.onSubmit(async (values) => {
    try {
      const response = await axios.patch(`/api/skill/user/${userId}`, values);
      if (response.status === 200) {
        notifications.show({
          title: "Update Successful",
          color: "teal",
          message: "Skill updated successfully",
        });
        window.location.reload();
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
          <Button bg="blue" variant="outline" type="submit">
            Simpan
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}

function WorkExperienceModal({ opened, onClose, userId }: any) {
  const { data } = useSWR(`/api/work-experience/user/${userId}`, fetcher);
  const experience = data && data[0].experience;
  const parsedStartAt = new Date(experience.startAt);
  const parsedEndedAt = new Date(experience.endedAt);
  const form = useForm({
    initialValues: {
      experienceId: experience.id,
      companyName: experience.companyName,
      description: experience.description,
      position: experience.position,
      startAt: parsedStartAt,
      endedAt: parsedEndedAt,
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const response = await axios.patch(
        `/api/work-experience/user/${userId}`,
        values
      );
      if (response.status === 200) {
        mutate("/api/work-experience/user/" + userId);
        console.log("Success updated work experience");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Modal opened={opened} onClose={onClose} title="Edit Work Experience">
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Posisi"
            placeholder="Masukkan posisi..."
            {...form.getInputProps("position")}
          />
          <TextInput
            label="Nama Perusahaan"
            placeholder="Masukkan nama perusahaan..."
            {...form.getInputProps("companyName")}
          />
          <DatesProvider settings={{ locale: "id" }}>
            <DatePickerInput
              label="Mulai"
              placeholder="Pilih tanggal mulai"
              {...form.getInputProps("startAt")}
            />
            <DatePickerInput
              label="Selesai"
              placeholder="Pilih tanggal selesai"
              {...form.getInputProps("endedAt")}
            />
          </DatesProvider>
          <Textarea
            label="Deskripsi"
            placeholder="Masukkan deskripsi..."
            {...form.getInputProps("description")}
          />
          <Divider />
          <Button variant="outline" color="blue" type="submit">
            Simpan
          </Button>
        </Stack>
      </form>
    </Modal>
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
        mutate("/api/work-experience/user/" + userId);
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
        <Button variant="outline" color="blue" type="submit">
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
          <Button variant="outline" type="submit">
            Tambah Portfolio
          </Button>
        </Stack>
      </form>
    </>
  );
}
