"use client";

import Button from "@dash/ui-kit/Button";

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
          <h2 className="relative z-10 text-lg font-semibold text-zinc-900 text-center md:text-left">Meus cartões</h2>
        </div>

        <div className="space-y-5">
          {cards.map((card) => (
            <div key={card.id}>
              <div className="mb-3">
                <h3 className="text-[16px] font-semibold text-[#333333]  text-center md:text-left">
                  {card.type === "physical" ? "Cartão físico" : "Cartão digital"}
                </h3>
              </div>

              <div className="grid grid-cols-1 xl:flex gap-5 justify-items-center">
                <div className="justify-center">
                  <div className="relative rounded-[10px] px-5 py-6 text-white shadow-md w-78 h-40"
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
                  <Button variant="primary" size="sm" className="sm:w-54 max-w-54 bg-orange-500 hover:bg-orange-600">
                    Configurar
                  </Button>

                  <Button variant="secondary" size="sm" className="sm:w-54 max-w-54 border-orange-500 text-[#E66B1A] hover:bg-[#fff7f1]">
                    Bloquear
                  </Button>

                  <span className="text-[14px] font-medium text-[#333333] text-center md:text-left">
                    Função: {card.type === "physical" ? "Débito/Crédito" : "Débito"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
