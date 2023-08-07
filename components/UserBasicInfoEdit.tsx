import {
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Modal,
  Stack,
  Title,
  rem,
} from "@mantine/core";
import { HiOutlineMapPin } from "react-icons/hi2";
import { FiGithub, FiInstagram, FiMail, FiPhone } from "react-icons/fi";
import { File } from "buffer";
import { useState } from "react";
import AvatarModal from "./AvatarModal";
import { useDisclosure } from "@mantine/hooks";

function UserBasicInfoEdit({ user, userRole }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const userData = user?.user;
  const skillsArr =
    userRole === "WORKER" && userData && userData.skills
      ? userData?.skills.split(",")
      : [];
  return (
    <>
      <AvatarModal onClose={close} opened={opened} userId={userData?.id} />
      <Card shadow="md" padding="md" withBorder radius="md">
        <Stack align="center">
          <Card.Section>
            <Avatar
              component="button"
              mx="auto"
              src={userData?.photo}
              size="xl"
              onClick={() => open()}
              className="rounded-full"
            />
            <Container className="mt-5" maw={rem(300)}>
              {userRole === "RECRUITER" && (
                <Stack spacing="xs">
                  <p className="text-xl font-semibold">
                    {userData.recruiterProfile?.companyName}
                  </p>
                  {/* <p className="text-sm">{userData.recruiterProfile}</p> */}
                  <p className="text-sm text-slate-400">
                    {userData.recruiterProfile.companySegment}
                  </p>
                  <Group className="text-slate-400" spacing="xs">
                    <HiOutlineMapPin />
                    {userData?.recruiterProfile.companyDomicile}
                  </Group>
                  <p className="text-sm text-slate-400">
                    {userData.recruiterProfile.companyInfo}
                  </p>
                  <Divider my="sm" />
                  <Stack>
                    <Group>
                      <FiMail />
                      {userData?.recruiterProfile?.companyEmail}
                    </Group>
                    <Group>
                      <FiPhone />
                      {userData?.recruiterProfile?.companyPhone}
                    </Group>
                  </Stack>
                </Stack>
              )}
            </Container>
          </Card.Section>
        </Stack>
        <Container className="mt-5" maw={rem(300)}>
          {userRole === "WORKER" && (
            <Stack spacing="xs">
              <p className="text-xl font-semibold">{userData?.name}</p>
              <p className="text-sm">{userData?.workerProfile?.workPlace}</p>
              <Group className="text-slate-400" spacing="xs">
                <HiOutlineMapPin />
                {userData?.domicile}
              </Group>
              <p className="text-sm text-slate-400">
                {userData?.workerProfile?.currentJob}
              </p>
              <p className="text-sm text-slate-400">{userData?.bio}</p>
              <Divider my="sm" />
              <div className="">
                <p className="text-xl font-semibold">Skill</p>
                <Grid my="md" gutter="xs">
                  {skillsArr &&
                    skillsArr.map((skill: any) => (
                      <Grid.Col span="auto" key={skill}>
                        <Badge fullWidth key={skill} radius="md">
                          {skill}
                        </Badge>
                      </Grid.Col>
                    ))}
                </Grid>
              </div>
              <div className="text-slate-400 mt-5">
                <Stack>
                  <Group>
                    <span className="w-6">
                      <FiMail />
                    </span>
                    <p>example@github.com</p>
                  </Group>
                  <Group>
                    <span className="w-6">
                      <FiGithub />
                    </span>
                    <p>@github</p>
                  </Group>
                  <Group>
                    <span className="w-6">
                      <FiInstagram />
                    </span>
                    <p>@instagram</p>
                  </Group>
                </Stack>
              </div>
              <Button mt="lg" className="bg-blue-500">
                Simpan
              </Button>
            </Stack>
          )}
        </Container>
      </Card>
    </>
  );
}

export default UserBasicInfoEdit;
