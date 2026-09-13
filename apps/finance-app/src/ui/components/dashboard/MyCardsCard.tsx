"use client";

export interface CardItem {
  id: string;
  title: string;
  owner: string;
  lastFourDigits: string;
  type: "physical" | "digital";
  status: "active" | "blocked";
  color: string;
}

interface MyCardsCardProps {
  cards: CardItem[]
}

export function MyCardsCard({ cards }: MyCardsCardProps) {
  return (
    <div className="w-full shrink-0 mt-3">
      <section className="w-full rounded-xl bg-zinc-300 p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="relative z-10 text-lg font-semibold text-zinc-900">Meus cartões</h2>
        </div>

        <div className="space-y-5">
          {cards.map((card) => (
            <div key={card.id} className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(w-84, 1fr)]">
              <div className="justify-center">
                <div className="mb-3">
                  <span className="text-[16px] font-semibold text-[#333333]">
                    {card.type === "physical" ? "Cartão físico" : "Cartão digital"}
                  </span>
                </div>

                <div
                  className="relative rounded-[10px] px-5 py-6 text-white shadow-md w-82 h-41"
                  style={{ background: card.color }}
                >
                  <div className="absolute inset-0 opacity-30">
                    <div className="grid grid-cols-8 h-full">
                      {Array.from({ length: 32 }).map((_, index) => (
                        <div key={index} className="border border-white/10 bg-white/10" />
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="mb-6">
                      <span className="text-[26px] font-semibold leading-none">Byte</span>
                      <span className="ml-2 text-[18px] font-medium">Platinum</span>
                    </div>

                    <div className="mb-4 text-[16px] font-medium">
                      {card.owner}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-bold tracking-[0.25em]">
                        {card.lastFourDigits}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <button className="rounded-md border max-w-54 border-[#E66B1A] bg-[#E66B1A] px-4 py-3 text-[14px] font-bold text-white transition hover:bg-[#cf5a0d]">
                  Configurar
                </button>
                <button className="rounded-md border max-w-54 border-[#E66B1A] bg-transparent px-4 py-3 text-[14px] font-bold text-[#E66B1A] transition hover:bg-[#fff7f1]">
                  Bloquear
                </button>
                <span className="text-[14px] font-medium text-[#333333]">
                  Função: {card.type === "physical" ? "Débito/Crédito" : "Débito"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
