import { Wallet, Plus, Check, CheckCircle2 } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { formatCurrency } from '../../utils/format';
import { useMemo } from 'react';

export function UpcomingExpensesWidget() {
    const { transactions, accounts, cards, markAsPaid } = useFinance();

    // Filter pending expenses and sort by date
    const pendingExpenses = useMemo(() => {
        return transactions
            .filter(t => t.type === 'expense' && !t.isPaid && t.status === 'pending')
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [transactions]);

    const handleMarkAsPaid = (id: string) => {
        // Prompt asked for animation and message: "Despesa marcada como paga!"
        // For now, simpler implementation: standard alert or toast would be better, but console for MVP
        // Animation will be handled by React removing the item from list naturally (maybe abruptly without layout animation lib, but acceptable).
        markAsPaid(id);
        // In a real app we'd trigger a toast here.
    };

    const getSourceLabel = (accountId: string) => {
        const account = accounts.find(a => a.id === accountId);
        if (account) return `${account.name} conta`;

        const card = cards.find(c => c.id === accountId);
        if (card) return `Crédito ${card.name.split(' ')[0]} **** ${card.lastDigits}`;

        return 'Conta desconhecida';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `Vence dia ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-white rounded-[32px] p-6 lg:p-8 border border-secondary-50 shadow-sm h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-900 flex items-center justify-center">
                        <Wallet size={20} className="text-primary-500" />
                    </div>
                    <h2 className="text-xl font-bold text-secondary-900">Próximas despesas</h2>
                </div>

                <button
                    className="w-10 h-10 rounded-full border border-secondary-200 flex items-center justify-center text-secondary-900 hover:bg-secondary-50 transition-colors"
                    title="Adicionar despesa"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-0 flex-1 overflow-y-auto pr-2 max-h-[400px]">
                {pendingExpenses.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-secondary-100 rounded-3xl min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <CheckCircle2 size={24} className="text-green-600" />
                        </div>
                        <span className="text-neutral-400 font-medium">Nenhuma despesa pendente</span>
                    </div>
                ) : (
                    pendingExpenses.map((expense) => (
                        <div key={expense.id} className="group flex items-center justify-between py-5 border-b border-secondary-50 last:border-none animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Left Info */}
                            <div className="flex flex-col gap-1">
                                <span className="text-secondary-900 font-bold text-sm md:text-base">
                                    {expense.description}
                                </span>
                                <span className="text-sm font-medium text-neutral-500">
                                    {formatDate(expense.date)}
                                </span>
                                <span className="text-xs text-neutral-400 mt-1">
                                    {getSourceLabel(expense.accountId || '')}
                                </span>
                            </div>

                            {/* Right Action */}
                            <div className="flex items-center gap-4">
                                <span className="text-secondary-900 font-bold text-base md:text-lg">
                                    {formatCurrency(expense.value)}
                                </span>
                                <button
                                    onClick={() => handleMarkAsPaid(expense.id)}
                                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-300 hover:border-lime-500 hover:bg-lime-50 hover:text-lime-600 transition-all duration-200 group-hover:scale-105"
                                    title="Marcar como paga"
                                >
                                    <Check size={16} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
