import { createContext, ReactNode, useState, useEffect, useMemo } from 'react';
import {
    Transaction,
    FamilyMember,
    CreditCard,
    BankAccount,
    Goal,
    DashboardFilters,
    TransactionFilterType,
    DateRange,
    CategorySummary
} from '../types';
import {
    MOCK_TRANSACTIONS,
    MOCK_MEMBERS,
    MOCK_ACCOUNTS,
    MOCK_CARDS,
    MOCK_GOALS
} from '../constants/mockData';

interface FinanceContextType {
    transactions: Transaction[];
    members: FamilyMember[];
    accounts: BankAccount[];
    cards: CreditCard[];
    goals: Goal[];
    currentMember: FamilyMember | null;
    setCurrentMember: (member: FamilyMember) => void;

    // Filters
    filters: DashboardFilters;
    setSearchText: (text: string) => void;
    setTransactionType: (type: TransactionFilterType) => void;
    setDateRange: (range: DateRange) => void;
    setSelectedMemberId: (id: string | null) => void;

    // Computed
    filteredTransactions: Transaction[];
    financialSummary: {
        totalBalance: number;
        totalIncome: number;
        totalExpenses: number;
    };
    expensesByCategory: CategorySummary[];
    // Actions
    markAsPaid: (transactionId: string) => void;
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [members, setMembers] = useState<FamilyMember[]>([]);
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [currentMember, setCurrentMember] = useState<FamilyMember | null>(null);

    // Initial Date Range: Current Month
    const initialDateRange = useMemo(() => {
        const now = new Date();
        return {
            startDate: new Date(now.getFullYear(), now.getMonth(), 1),
            endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0)
        };
    }, []);

    const [filters, setFilters] = useState<DashboardFilters>({
        searchText: '',
        transactionType: 'all',
        dateRange: initialDateRange,
        selectedMemberId: null
    });

    useEffect(() => {
        setTransactions(MOCK_TRANSACTIONS);
        setMembers(MOCK_MEMBERS);
        setAccounts(MOCK_ACCOUNTS);
        setCards(MOCK_CARDS);
        setGoals(MOCK_GOALS);

        if (MOCK_MEMBERS.length > 0) {
            setCurrentMember(MOCK_MEMBERS[0]);
        }
    }, []);

    // Filter Logic
    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            // 1. Filter by Date Range
            const tDate = new Date(t.date);
            if (tDate < filters.dateRange.startDate || tDate > filters.dateRange.endDate) {
                return false;
            }

            // 2. Filter by Member
            if (filters.selectedMemberId && t.memberId !== filters.selectedMemberId) {
                return false;
            }

            // 3. Filter by Type
            if (filters.transactionType !== 'all' && t.type !== filters.transactionType) {
                return false;
            }

            // 4. Filter by Search Text
            if (filters.searchText) {
                const search = filters.searchText.toLowerCase();
                const matchesDesc = t.description.toLowerCase().includes(search);
                const matchesCat = t.category.toLowerCase().includes(search);
                if (!matchesDesc && !matchesCat) return false;
            }

            return true;
        });
    }, [transactions, filters]);

    // Financial Summary Calculation based on FILTERED transactions
    // Note: For "Total Balance", usually we want the accumulated balance up to the end date, 
    // but for "Income/Expense" cards we usually want strictly what happened in the period.
    // The Prompt says: "calculateTotalBalance... updating automatically when filters change".
    // Assuming Total Balance here is the sum of Income - Expenses within the filtered view for simplicity,
    // OR it could be the account balance. Given "Cards de Resumo", it's usually Period Summary.
    // HOWEVER, "Saldo Total" often implies Account Balance. 
    // If I filter by "Last Month", Saldo Total usually shouldn't change to just that month's diff, 
    // but the prompt explicitly asking to update with filters suggests it behaves like a "Period Result" or "Cash Flow" for that period.
    // I will implement as "Result of the Period" (Income - Expense) + Carry over?
    // Let's stick to: Sum of Filtered Transactions for now as it's deterministic.

    const financialSummary = useMemo(() => {
        const income = filteredTransactions
            .filter(t => t.type === 'income' && t.status === 'completed')
            .reduce((acc, t) => acc + t.value, 0);

        const expenses = filteredTransactions
            .filter(t => t.type === 'expense' && t.status === 'completed')
            .reduce((acc, t) => acc + t.value, 0);

        return {
            totalBalance: income - expenses,
            totalIncome: income,
            totalExpenses: expenses
        };
    }, [filteredTransactions]);

    // Expenses by Category
    const expensesByCategory = useMemo(() => {
        const categoryMap = new Map<string, number>();
        let totalExpenses = 0;

        filteredTransactions.forEach(t => {
            if (t.type === 'expense' && t.status === 'completed') {
                const current = categoryMap.get(t.category) || 0;
                categoryMap.set(t.category, current + t.value);
                totalExpenses += t.value;
            }
        });

        const colors = [
            '#84CC16', // lime-500
            '#111827', // gray-900 (black)
            '#9CA3AF', // gray-400
            '#374151', // gray-700
            '#D1D5DB'  // gray-300
        ];

        return Array.from(categoryMap.entries())
            .map(([name, value], index) => ({
                categoryId: name, // Using name as ID for now
                name,
                totalValue: value,
                percentage: totalExpenses > 0 ? (value / totalExpenses) * 100 : 0,
                color: colors[index % colors.length]
            }))
            .sort((a, b) => b.totalValue - a.totalValue);
    }, [filteredTransactions]);

    // Setters
    const setSearchText = (text: string) => setFilters(prev => ({ ...prev, searchText: text }));
    const setTransactionType = (type: TransactionFilterType) => setFilters(prev => ({ ...prev, transactionType: type }));
    const setDateRange = (range: DateRange) => setFilters(prev => ({ ...prev, dateRange: range }));
    const setSelectedMemberId = (id: string | null) => setFilters(prev => ({ ...prev, selectedMemberId: id }));

    const markAsPaid = (transactionId: string) => {
        setTransactions(prev => {
            const tx = prev.find(t => t.id === transactionId);
            if (!tx) return prev;

            const updatedTransactions = prev.map(t =>
                t.id === transactionId
                    ? { ...t, status: 'completed' as const, isPaid: true }
                    : t
            );

            // Handle Recurring
            if (tx.isRecurring) {
                const nextDate = new Date(tx.date);
                nextDate.setMonth(nextDate.getMonth() + 1);

                const newTx: Transaction = {
                    ...tx,
                    id: crypto.randomUUID(), // Generate new ID
                    date: nextDate.toISOString(),
                    status: 'pending',
                    isPaid: false
                };
                return [...updatedTransactions, newTx];
            }

            return updatedTransactions;
        });
    };

    return (
        <FinanceContext.Provider value={{
            transactions,
            members,
            accounts,
            cards,
            goals,
            currentMember,
            setCurrentMember,
            filters,
            setSearchText,
            setTransactionType,
            setDateRange,
            setSelectedMemberId,
            filteredTransactions,
            financialSummary,
            expensesByCategory,
            markAsPaid
        }}>
            {children}
        </FinanceContext.Provider>
    );
}
