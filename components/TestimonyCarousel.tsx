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
      <Carousel className="max-w-full"
        slideSize="100%" // Initially, show 1 card on all screens
        mx="auto"
        withIndicators
        height={435}
        slideGap="sm"
        slidesToScroll={1} // Initially, scroll 1 card at a time
        loop
        align="start"
        breakpoints={[
          { maxWidth: 639, slideSize: "100%" }, // Small screen: 1 card
          { minWidth: 640, slideSize: "33.33%" }, // Large screen: 3 cards
        ]}>
        {data.map((user) => (
          <Carousel.Slide key={user.name}>
            <div className="card border h-96 shadow-md bg-white">
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
