import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-violet-800">
      <div className="flex max-w-7xl mx-auto p-10 text-neutral-content">
        <div className="w-screen flex flex-col space-y-5">
          <Image
            src="/logo.svg"
            width={178}
            height={50}
            alt="logo"
            className="w-32"
          />
          <p className="max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod
            ipsum et dui rhoncus auctor.
          </p>
          <div className="border-t-2 mt-44"></div>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 justify-between">
                <p className="text-sm">2020 Pewworld. All right reserved</p>
                <div className="flex gap-10 text-sm">
                    <a href="">Telepon</a>
                    <a href="">Email</a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
