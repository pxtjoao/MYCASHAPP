export type TransactionType = 'income' | 'expense';

export type TransactionStatus = 'pending' | 'completed';

export interface Transaction {
    id: string;
    type: TransactionType;
    value: number;
    description: string;
    category: string;
    date: string; // ISO date string
    accountId: string | null; // Null if cash or general
    memberId: string | null;
    installments?: number; // 1 for one-time
    currentInstallment?: number;
    status: TransactionStatus;
    isRecurring: boolean;
    isPaid: boolean;
}

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    emoji?: string;
}

export type CardTheme = 'black' | 'lime' | 'white';

export interface CreditCard {
    id: string;
    type: 'creditCard';
    name: string;
    holderId: string;
    closingDay: number;
    dueDay: number;
    limit: number;
    currentBill: number; // Current month's bill
    theme: CardTheme;
    lastDigits?: string;
}

export interface BankAccount {
    id: string;
    type: 'account';
    name: string;
    holderId: string;
    balance: number;
    initialBalance: number;
}

export interface FamilyMember {
    id: string;
    name: string;
    role: string; // Pai, Mãe, etc.
    avatar?: string;
    income?: number;
}

export interface DateRange {
    startDate: Date;
    endDate: Date;
}

export type TransactionFilterType = 'all' | 'income' | 'expense';

export interface CategorySummary {
    categoryId: string; // Or name if no ID
    name: string;
    totalValue: number;
    percentage: number; // 0-100
    color?: string;
}

export interface DashboardFilters {
    searchText: string;
    transactionType: TransactionFilterType;
    dateRange: DateRange;
    selectedMemberId: string | null;
}
