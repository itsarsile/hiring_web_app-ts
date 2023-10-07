import {
    Avatar,
    Badge,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Group,
    Stack,
    rem,
  } from "@mantine/core";
  import { HiOutlineMapPin } from "react-icons/hi2";
  import { FiGithub, FiInstagram, FiMail } from "react-icons/fi";
  
  function UserBasicInfoEdit({ user }: any) {
    const userData = user.user;
    const skillsArr = userData.skills ? userData.skills.split(",") : []
    return (
      <>
        <Card shadow="md" padding="md" withBorder radius="md">
          <Stack align="center">
              <Card.Section>
              <Avatar mx="auto" src={userData.photo} size="xl" />
            </Card.Section>
          </Stack>
          <Container className="mt-5" maw={rem(300)}>
            <Stack spacing="xs">
              <p className="text-xl font-semibold">{userData.name}</p>
              <p className="text-sm">{userData.workerProfile?.workPlace}</p>
              <Group className="text-slate-400" spacing="xs">
                <HiOutlineMapPin />
                {userData.workerProfile?.province ? userData.workerProfile.province.cities[0].name : "Not yet set" } 
              </Group>
              <p className="text-sm text-slate-400">
                {userData.workerProfile?.currentJob}
              </p>
              <p className="text-sm text-slate-400">
                {userData.bio}
              </p>
              <Divider my="sm" />
              <div className="">
                <p className="text-xl font-semibold">Skill</p>
                <Grid my="md" gutter="xs">
                  {skillsArr.map((skill: any) => (
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
            </Stack>
          </Container>
        </Card>
      </>
    );
  }
  
  export default UserBasicInfoEdit;
  
