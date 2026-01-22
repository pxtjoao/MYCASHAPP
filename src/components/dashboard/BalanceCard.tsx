import { TrendingUp } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { formatCurrency } from '../../utils/format';
import { AnimatedValue } from '../common/AnimatedValue';

export function BalanceCard() {
    const { financialSummary } = useFinance();
    const totalBalance = financialSummary.totalBalance;
    const growthPercentage = 12; // Mocked for now

    return (
        <div className="relative w-full h-[180px] bg-secondary-900 rounded-3xl p-6 overflow-hidden flex flex-col justify-between shadow-lg">
            {/* Decorative blurred circle */}
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-start justify-between">
                <span className="text-secondary-50 font-medium text-sm">Saldo Total</span>
            </div>

            {/* Value */}
            <div className="relative z-10 text-surface-500 font-bold text-4xl mt-2 tracking-tight">
                <AnimatedValue value={totalBalance} formatFn={formatCurrency} />
            </div>

            {/* Footer / Badge */}
            <div className="relative z-10 mt-auto flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-500/10 rounded-full backdrop-blur-md">
                    <div className="bg-primary-500 rounded-full p-0.5">
                        <TrendingUp size={12} className="text-secondary-900" />
                    </div>
                    <span className="text-primary-500 text-xs font-semibold">
                        +{growthPercentage}% esse mês
                    </span>
                </div>
            </div>
        </div>
    );
}
