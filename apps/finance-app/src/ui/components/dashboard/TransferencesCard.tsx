"use client";

import { GetTransferenceStatisticsUseCase } from '@dash/core/usecases/GetTransferenceStatisticsUseCase';
import { CSSProperties, useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuth } from '@/ui/hooks/useAuth';
import { NextTransactionRepository } from '@/infra/repositories/NextTransactionRepository';

const COLORS = ['#1685f5', '#963cf4', '#f42c9e'];
const statisticsUseCase = new GetTransferenceStatisticsUseCase(new NextTransactionRepository());

export const TransferencesCard = () => {

    const customLabelStyles: CSSProperties = {
        fill: 'white',
        fontSize: 12,
        marginLeft: 0,
    };


    const { user } = useAuth();
    const [statistics, setStatistics] = useState({ total: 0, data: [] as { name: string; value: number }[] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;

        let cancelled = false;
        setLoading(true);
        setError(null);

        statisticsUseCase
            .execute(user.id)
            .then((result) => {
                if (!cancelled) setStatistics(result);
            })
            .catch(() => {
                if (!cancelled) setError('Não foi possível carregar as transferências.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [user]);

    const chartData = statistics.data.map((item, index) => ({
        ...item,
        color: COLORS[index % COLORS.length],
    }));

    return (
        <div className="w-full shrink-0 xl:py-6">
            <section className="flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-[#d0d0d0] p-4 text-[#111827] md:p-5">
                <h2 className="relative z-10 text-xl font-bold">Transferências</h2>

                <p className="relative z-10 text-md text-[#00536b]">
                    Total: {loading ? 'Carregando...' : `R$ ${statistics.total.toFixed(2).replace('.', ',')}`}
                </p>

                <div className="relative z-10 mt-5">
                    <p className="mb-2 text-[10px]">Estatísticas</p>
                    <div className="flex items-center gap-4 rounded bg-[#00566a] px-3 py-3 text-white">
                        <div className="h-56 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Tooltip
                                        formatter={(value, name) =>
                                            [`R$ ${Number(value ?? 0).toFixed(2).replace('.', ',')}`, String(name)]
                                        }
                                    />
                                    <Legend position="right" iconType="circle"
                                        wrapperStyle={customLabelStyles} />
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {error && <p className="text-xs text-red-100">{error}</p>}
                </div>
            </section>
        </div>
    );
};