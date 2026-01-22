import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { clsx } from 'clsx';

// Mock Data for 7 months
const DATA = [
    { month: 'Jul', income: 4200, expense: 3800 },
    { month: 'Ago', income: 4800, expense: 3500 },
    { month: 'Set', income: 5100, expense: 4200 },
    { month: 'Out', income: 4900, expense: 3900 },
    { month: 'Nov', income: 6200, expense: 4500 },
    { month: 'Dez', income: 7500, expense: 5000 },
    { month: 'Jan', income: 6800, expense: 4100 },
];

// Use any for Recharts tooltip props to simplify type handling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-xl border border-secondary-50 min-w-[160px]">
                <p className="font-bold text-secondary-900 mb-2">{label}</p>
                <div className="flex flex-col gap-1">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className={clsx(
                                    "w-2 h-2 rounded-full",
                                    entry.dataKey === 'income' ? "bg-primary-500" : "bg-secondary-900"
                                )}
                            />
                            <span className={clsx(
                                "text-sm font-medium",
                                entry.dataKey === 'income' ? "text-primary-600" : "text-secondary-900"
                            )}>
                                {entry.name}: {formatCurrency(entry.value || 0)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const formatYAxis = (value: number) => {
    if (value >= 1000) return `R$ ${value / 1000}k`;
    return `R$ ${value}`;
};

export function FinancialFlowChart() {
    return (
        <div className="w-full h-full bg-white rounded-3xl border border-secondary-50 p-6 shadow-sm flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-900 flex items-center justify-center">
                        <TrendingUp size={20} className="text-primary-500" />
                    </div>
                    <h2 className="text-xl font-bold text-secondary-900">Fluxo Financeiro</h2>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary-500 shadow-sm shadow-primary-500/50" />
                        <span className="text-sm font-medium text-secondary-600">Receitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary-900 shadow-sm shadow-secondary-900/50" />
                        <span className="text-sm font-medium text-secondary-600">Despesas</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#84CC16" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#84CC16" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#111827" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="#F3F4F6" />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            tickFormatter={formatYAxis}
                            dx={-10}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="income"
                            name="Receitas"
                            stroke="#84CC16"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#84CC16' }}
                        />

                        <Area
                            type="monotone"
                            dataKey="expense"
                            name="Despesas"
                            stroke="#111827"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#111827' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
