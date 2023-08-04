import { Carousel } from "@mantine/carousel";
import Image from "next/image";

const data = [
  {
    name: "Harry Styles",
    image: "/harrystyles.png",
    jobDesk: "Freelancer",
    testimony:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.",
  },
  {
    name: "Harry Styles",
    image: "/harrystyles.png",
    jobDesk: "Freelancer",
    testimony:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.",
  },
  {
    name: "Harry Styles",
    image: "/harrystyles.png",
    jobDesk: "Freelancer",
    testimony:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.",
  },
  {
    name: "Harry Styles",
    image: "/harrystyles.png",
    jobDesk: "Freelancer",
    testimony:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.",
  },
  {
    name: "Harry Styles",
    image: "/harrystyles.png",
    jobDesk: "Freelancer",
    testimony:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.",
  },
  {
    name: "Harry Styles",
    image: "/harrystyles.png",
    jobDesk: "Freelancer",
    testimony:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.",
  },
];
export default function TestimonyCarousel() {
  return (
    <>
      <Carousel className="max-w-4xl" slideSize="33%" mx="auto" withIndicators height={435} slideGap="sm" slidesToScroll={3} loop align="start">
        {data.map((user) => (
          <Carousel.Slide key={user}>
            <div className="card border h-96 shadow-md">
              <div className="card-body justify-center">
                <div className="mx-auto w-20">
                  <Image
                    src={user.image}
                    height={120}
                    width={120}
                    alt="avatar"
                  />
                </div>
                <div className="text-center">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-slate-400">{user.jobDesk}</p>
                  {user.testimony}
                </div>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
