import { AmazonLogo, MicrosoftLogo, NetflixLogo, SonyLogo, VerizonLogo } from "../../Utils/svg";


export default function Companies() {
    return (
        <div className="flex flex-col place-items-center min-w-lg bg-base-200 mt-20 ">
           <h1 className="text-4xl font-bold tracking-wide text-center">
  <span className="text-blue-700">1k + </span> Trusted Partners choosing <span className="text-yellow-500">CarGuru Brand</span> every day 
</h1>

            <div className="flex flex-wrap justify-center lg:gap-40 gap-10 md:gap-20 mt-8 md:justify-around">
                <div className=" text-[#e7e7e7] hover:shadow-2xl hover:animate-ping hover:delay-300 p-2">
                    <AmazonLogo />
                </div>
                <div className="text-[#3e8454] hover:animate-bounce transition hover:delay-300">
                    <VerizonLogo />
                </div>
                 <div className="text-[#0062cb] hover:motion-safe:animate-spin transition hover:delay-300">
                    <MicrosoftLogo />
                </div>
                <div className=" text-[#7a0909] hover:animate-bounce transition hover:delay-300">
                    <NetflixLogo />
                </div>
                <div className=" dark:text-black hover:animate-pulse transition hover:delay-300">
                    <SonyLogo />
                </div>
            </div>
        </div>
    )
}