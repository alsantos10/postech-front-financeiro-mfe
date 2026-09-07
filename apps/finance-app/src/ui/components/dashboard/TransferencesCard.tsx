
import { CSSProperties } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const TransferencesCard = () => {
    // 1. Dados que vão aparecer no gráfico
    const dados = [
        { name: 'Sabor Calabresa', value: 400, color: '#EF4444' }, // Vermelho (Tailwind red-500)
        { name: 'Sabor Muçarela', value: 300, color: '#3B82F6' },  // Azul (Tailwind blue-500)
        { name: 'Sabor Frango Catupiry', value: 200, color: '#10B981' }, // Verde (Tailwind emerald-500)
        { name: 'Sabor Quatro Queijos', value: 100, color: '#F59E0B' }, // Amarelo (Tailwind amber-500)
    ];

    const customLabelStyles: CSSProperties = {
        color: 'white',
        fontSize: 12,
        marginLeft: 10
    };

    return (
        <div className="w-full shrink-0 xl:py-6">
            <section className="flex w-full flex-col gap-5 overflow-hidden rounded-xl bg-[#d0d0d0] p-4 text-[#111827] md:p-5">

                <h2 className="relative z-10 text-xl font-bold">Transferências</h2>

                <p className="relative z-10 text-xs text-[#00536b]">Total: R$ 50.000,00</p>

                <div className="relative z-10 grid grid-cols-2 gap-2.5">
                    <div className="rounded bg-[#00566a] px-2 py-2 text-center text-[10px] text-white">
                        <p>Renda Fixa</p>
                        <p className="mt-1">R$ 36.000,00</p>
                    </div>
                    <div className="rounded bg-[#00566a] px-2 py-2 text-center text-[10px] text-white">
                        <p>Renda variável</p>
                        <p className="mt-1">R$ 14.000,00</p>
                    </div>
                </div>

                <div className="relative z-10 mt-5">
                    <p className="mb-2 text-[10px]">Estatísticas</p>
                    <div className="flex items-center gap-4 rounded bg-[#00566a] px-3 py-3 text-white">
                        <div
                            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                            style={{
                                background: "conic-gradient(#1685f5 0 35%, #963cf4 35% 67%, #f42c9e 67% 84%, #f59a23 84% 100%)",
                            }}
                            aria-label="Distribuição dos investimentos"
                            role="img"
                        >
                            <div className="h-9 w-9 rounded-full bg-[#00566a]" />
                        </div>

                        <ul className="space-y-1 text-[8px] leading-tight">
                            <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#1685f5]" />Fundos de investimento</li>
                            <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#963cf4]" />Tesouro Direto</li>
                            <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#f42c9e]" />Previdência Privada</li>
                            <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#f59a23]" />Bolsa de Valores</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="flex w-full flex-col gap-5 overflow-hidden rounded-xl bg-[#d0d0d0] p-4 text-[#111827] md:p-5">
                <h2 className="relative z-10 text-xl font-bold">Transferências</h2>
                {/* ResponsiveContainer faz o gráfico se ajustar ao tamanho da div pai */}

                <div className="flex items-center gap-4 rounded bg-[#00566a] px-3 py-3 text-white">
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Legend 
                                    position="right" 
                                    iconType="circle"
                                    labelStyle={customLabelStyles} />
                                <Pie
                                    data={dados}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50} // Transforma a pizza em uma rosquinha (Donut Chart)
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {dados.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
        </div>
    );
};