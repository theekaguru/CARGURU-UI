import {
  AmazonLogo,
  MicrosoftLogo,
  NetflixLogo,
  SonyLogo,
  VerizonLogo,
} from "../../Utils/svg";

export default function Companies() {
  return (
    <section className="bg-[#0C1729] py-16 px-4 w-full">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-[#E2ECFD] leading-snug">
          <span className="text-[#6896C0]">1k+ </span> Trusted Partners choosing{" "}
          <span className="text-yellow-400">CarGuru Brand</span> every day
        </h1>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
          <div className="flex justify-center hover:scale-110 transition-transform duration-300">
            <AmazonLogo />
          </div>
          <div className="flex justify-center hover:scale-110 transition-transform duration-300">
            <VerizonLogo />
          </div>
          <div className="flex justify-center hover:scale-110 transition-transform duration-300">
            <MicrosoftLogo />
          </div>
          <div className="flex justify-center hover:scale-110 transition-transform duration-300">
            <NetflixLogo />
          </div>
          <div className="flex justify-center hover:scale-110 transition-transform duration-300">
            <SonyLogo />
          </div>
        </div>
      </div>
    </section>
  );
}
