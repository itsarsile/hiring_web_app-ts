import { Card, Container, Divider, Image, Stack, Title } from "@mantine/core";

function UserCatalogue({ user }: any) {
  const userData = user.user;
  console.log(userData);
  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const years = end.getUTCFullYear() - start.getUTCFullYear();
    const months = end.getUTCMonth() - start.getUTCMonth();

    return `${years} year${years !== 1 ? "s" : ""} ${months} month${
      months !== 1 ? "s" : ""
    }`;
  };
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
    });
  };
  const UserPortfolio = userData.portfolios.map((_p: any) => (
    <div key={_p.portfolio.id} className="flex flex-col justify-center items-center text-center gap-2">
      <a href={_p.portfolio.link} target="_blank" className="px-5">
        <Image
          src={_p.portfolio.photo}
          width={160}
          height={150}
          alt="p thumbnail"
          className="rounded-md shadow-md object-fill aspect-video"
        />
      </a>
      <div className="">
        <p className="font-medium">{_p.portfolio.title}</p>
        <p className="text-xs text-slate-400">
          {_p.portfolio.types.toUpperCase()}
        </p>
      </div>
    </div>
  ));

  const UserExperience = userData.experiences.map((_e: any) => (
    <Stack key={_e.experience.experienceId} spacing="sm">
      <div className="">
      <Title order={5}>{_e.experience.position}</Title>
      <p className="text-slate-600 font-medium">{_e.experience.companyName}</p>
      <div className="text-slate-400 text-sm flex flex-col">
        <span>
          {formatDate(_e.experience.startAt)} -{" "}
          {formatDate(_e.experience.endedAt)}
        </span>
        <span className="text-xs">
          {calculateDuration(_e.experience.startAt, _e.experience.endedAt)}
        </span>
      </div>
      </div>

      <p className="text-sm">{_e.experience.description}</p>
    </Stack>
  ));
  return (
    <>
      <Card shadow="md" padding="md" withBorder radius="md">
        <Container my="lg">
          <Stack spacing="sm">
            <p className="text-xl font-semibold">Portfolio</p>
            <Divider />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-3">
              {UserPortfolio}
            </div>
            <p className="text-xl font-semibold">Pengalaman Kerja</p>
            <Divider />
            {UserExperience}
          </Stack>
        </Container>
      </Card>
    </>
  );
}

export default UserCatalogue;
