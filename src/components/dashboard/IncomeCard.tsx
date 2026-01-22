import { ArrowDownLeft } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { formatCurrency } from '../../utils/format';
import { AnimatedValue } from '../common/AnimatedValue';

export function IncomeCard() {
    const { financialSummary } = useFinance();
    const totalIncome = financialSummary.totalIncome;

    return (
        <div className="w-full h-[180px] bg-white rounded-3xl p-6 flex flex-col justify-between border border-secondary-50 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between">
                <span className="text-secondary-900 font-bold text-lg">Receitas</span>

                <div className="w-10 h-10 rounded-full bg-background-400 flex items-center justify-center">
                    <ArrowDownLeft size={20} className="text-secondary-900" />
                </div>
            </div>

            {/* Value */}
            <div className="text-secondary-900 font-bold text-3xl tracking-tight">
                <AnimatedValue value={totalIncome} formatFn={formatCurrency} />
            </div>
        </div>
    );
}
