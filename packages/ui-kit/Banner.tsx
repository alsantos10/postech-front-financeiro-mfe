import Image from "next/image";

export function Banner() {
  return (
    <section className="mx-auto flex h-auto w-full max-w-6xl flex-col overflow-hidden rounded-4xl md:h-80 md:flex-row">
      <div className="flex h-full w-full flex-col items-center justify-center px-8 py-8 text-center text-white md:w-1/2 md:items-start md:px-12 md:py-16 md:text-left">
        <h2 className="max-w-xl text-[1.5rem] font-semibold not-italic leading-[1.2] tracking-[0%] text-black align-middle">
          Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
        </h2>
      </div>

      <div className="flex w-full items-center justify-center px-4 pb-8 md:h-full md:w-1/2 md:p-6">
        <Image
          src="/IlustraBanner.svg"
          alt="Ilustração do banner"
          width={420}
          height={320}
          loading="eager"
          className="mx-auto h-auto w-full object-contain lg:max-w-105 md:h-full
          6"
        />
      </div>
    </section>
  );
}

export default Banner;
