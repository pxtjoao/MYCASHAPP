import { Transaction, FamilyMember, CreditCard, BankAccount, Goal } from '../types';

export const MOCK_MEMBERS: FamilyMember[] = [
    { id: '1', name: 'João Silva', role: 'Pai', income: 5000, avatar: 'https://github.com/shadcn.png' },
    { id: '2', name: 'Maria Silva', role: 'Mãe', income: 4500, avatar: 'https://github.com/shadcn.png' }, // Placeholder avatar
];

export const MOCK_ACCOUNTS: BankAccount[] = [
    { id: 'acc1', type: 'account', name: 'Nubank', holderId: '1', balance: 1250.50, initialBalance: 1000 },
    { id: 'acc2', type: 'account', name: 'Inter', holderId: '2', balance: 3400.00, initialBalance: 3000 },
];

export const MOCK_CARDS: CreditCard[] = [
    {
        id: 'card1',
        type: 'creditCard',
        name: 'Nubank Ultravioleta',
        holderId: '1',
        closingDay: 25,
        dueDay: 5,
        limit: 15000,
        currentBill: 2350.90,
        theme: 'black',
        lastDigits: '4589'
    },
    {
        id: 'card2',
        type: 'creditCard',
        name: 'XP Visa Infinite',
        holderId: '1',
        closingDay: 10,
        dueDay: 17,
        limit: 20000,
        currentBill: 0,
        theme: 'black',
        lastDigits: '9876'
    }
] as CreditCard[];

export const MOCK_GOALS: Goal[] = [
    { id: 'g1', name: 'Reserva de Emergência', targetAmount: 20000, currentAmount: 8500, deadline: '2026-12-31', emoji: '🛡️' },
    { id: 'g2', name: 'Viagem para Disney', targetAmount: 15000, currentAmount: 2000, deadline: '2027-06-01', emoji: '🏰' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 't1',
        type: 'expense',
        value: 150.90,
        description: 'Compras Supermercado',
        category: 'Alimentação',
        date: new Date().toISOString(),
        accountId: 'acc1',
        memberId: '1',
        status: 'completed',
        isRecurring: false,
        isPaid: true
    },
    {
        id: 't2',
        type: 'income',
        value: 5000.00,
        description: 'Salário Mensal',
        category: 'Salário',
        date: new Date().toISOString(),
        accountId: 'acc1',
        memberId: '1',
        status: 'completed',
        isRecurring: true,
        isPaid: true
    }
];
