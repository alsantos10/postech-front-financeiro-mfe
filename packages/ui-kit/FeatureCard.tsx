import Image from "next/image";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="flex flex-col items-center p-6">
      <div className="mb-4 flex h-auto w-12 items-center justify-center text-center">
        <Image src={icon} alt={title} width={73} height={0} className="mx-auto block h-auto w-18.25" />
      </div>
      <h3 className="mb-2 max-w-45 whitespace-nowrap font-[Inter] text-[16px] font-bold not-italic leading-[120%] tracking-[0%] text-center align-middle text-[#47A138]">
        {title}
      </h3>
      <p className="font-[Inter] text-[16px] font-normal not-italic leading-[120%] tracking-[0%] text-center align-middle text-[#767676]">
        {description}
      </p>
    </article>
  );
}

export default FeatureCard;
