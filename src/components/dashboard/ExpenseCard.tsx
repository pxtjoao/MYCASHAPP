import { ArrowUpRight } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { formatCurrency } from '../../utils/format';
import { AnimatedValue } from '../common/AnimatedValue';

export function ExpenseCard() {
    const { financialSummary } = useFinance();
    const totalExpenses = financialSummary.totalExpenses;

    return (
        <div className="w-full h-[180px] bg-white rounded-3xl p-6 flex flex-col justify-between border border-secondary-50 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between">
                <span className="text-neutral-500 font-medium text-lg">Despesas</span>

                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                    <ArrowUpRight size={20} className="text-red-600" />
                </div>
            </div>

            {/* Value */}
            <div className="text-secondary-900 font-bold text-3xl tracking-tight">
                <AnimatedValue value={totalExpenses} formatFn={formatCurrency} />
            </div>
        </div>
    );
}
