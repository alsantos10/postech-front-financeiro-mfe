import { Banner } from "@dash/ui-kit/Banner";
import { FeatureCard } from "@dash/ui-kit/FeatureCard";

const advantages = [
  {
    title: "Conta e cartão gratuitos",
    description: "Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.",
    icon: "/icons/iconPresente.svg",
  },
  {
    title: "Saques sem custo",
    description: "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.",
    icon: "/icons/iconSaque.svg",
  },
  {
    title: "Programa de pontos",
    description: "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!",
    icon: "/icons/iconPontos.svg",
  },
  {
    title: "Seguro dispositivos",
    description: "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.",
    icon: "/icons/iconDispositivos.svg",
  },
];

export default function HomeContent() {
    return (
    <section
        className="flex flex-1 items-start justify-center px-6 py-10"
        style={{
        background: "linear-gradient(180deg, #004D61 0%, #FFFFFF 100%)",
        }}
    >
        <div className="w-full max-w-7xl">
        <div className="flex justify-center">
            <Banner imageSrc="/illustrations/IlustraBanner.svg" title="Controle da sua vida financeira" />
        </div>

        <section className="mt-2 px-6 py-8 md:px-10">
            <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-center font-[Inter] text-[25px] font-bold not-italic leading-[120%] tracking-[0%] text-black align-middle">
                Vantagens do nosso banco
            </h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                {advantages.map((item) => (
                <FeatureCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                />
                ))}
            </div>
            </div>
        </section>
        </div>
    </section>
    );
}