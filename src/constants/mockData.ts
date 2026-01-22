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
    },
    {
        id: 'card3',
        type: 'creditCard',
        name: 'C6 Carbon',
        holderId: '1',
        closingDay: 5,
        dueDay: 12,
        limit: 50000,
        currentBill: 12450.00,
        theme: 'black',
        lastDigits: '1122'
    },
    {
        id: 'card4',
        type: 'creditCard',
        name: 'Inter Black',
        holderId: '2',
        closingDay: 1,
        dueDay: 10,
        limit: 10000,
        currentBill: 1200.50,
        theme: 'orange', // Using orange as generic or mapping to available themes
        lastDigits: '3344'
    },
    {
        id: 'card5',
        type: 'creditCard',
        name: 'Neon Visa',
        holderId: '2',
        closingDay: 15,
        dueDay: 22,
        limit: 5000,
        currentBill: 450.00,
        theme: 'blue',
        lastDigits: '5566'
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
    },
    {
        id: 't3',
        type: 'expense',
        value: 1200.00,
        description: 'Aluguel',
        category: 'Moradia',
        date: new Date().toISOString(),
        accountId: 'acc1',
        memberId: '1',
        status: 'completed',
        isRecurring: true,
        isPaid: true
    },
    {
        id: 't4',
        type: 'expense',
        value: 250.00,
        description: 'Combustível',
        category: 'Transporte',
        date: new Date().toISOString(),
        accountId: 'acc1',
        memberId: '1',
        status: 'completed',
        isRecurring: false,
        isPaid: true
    },
    {
        id: 't5',
        type: 'expense',
        value: 120.00,
        description: 'Academia',
        category: 'Saúde',
        date: new Date().toISOString(),
        accountId: 'acc1',
        memberId: '2',
        status: 'completed',
        isRecurring: true,
        isPaid: true
    },
    {
        id: 't6',
        type: 'expense',
        value: 300.00,
        description: 'Jantar',
        category: 'Lazer',
        date: new Date().toISOString(),
        accountId: 'acc2',
        memberId: '2',
        status: 'completed',
        isRecurring: false,
        isPaid: true
    },
    {
        id: 't7',
        type: 'expense',
        value: 89.90,
        description: 'Netflix Ultra HD',
        category: 'Assinaturas',
        date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), // Due in 2 days
        accountId: 'card1', // Credit Card ID
        memberId: '1',
        status: 'pending',
        isRecurring: true,
        isPaid: false
    },
    {
        id: 't8',
        type: 'expense',
        value: 1400.00,
        description: 'Escola das Crianças',
        category: 'Educação',
        date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), // Due in 5 days
        accountId: 'acc1',
        memberId: '1',
        status: 'pending',
        isRecurring: true,
        isPaid: false
    },
    {
        id: 't9',
        type: 'expense',
        value: 450.00,
        description: 'Manutenção Carro',
        category: 'Transporte',
        date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(), // Due in 10 days
        accountId: 'card2',
        memberId: '1',
        status: 'pending',
        isRecurring: false,
        isPaid: false
    },
    {
        id: 't10',
        type: 'expense',
        value: 200.00,
        description: 'Livros',
        category: 'Educação',
        date: new Date().toISOString(),
        accountId: 'acc1',
        memberId: '1',
        status: 'completed', // Completed to show in Carousel
        isRecurring: false,
        isPaid: true
    },
    {
        id: 't11',
        type: 'expense',
        value: 350.00,
        description: 'Roupas',
        category: 'Vestuário',
        date: new Date().toISOString(),
        accountId: 'card3',
        memberId: '2',
        status: 'completed',
        isRecurring: false,
        isPaid: true
    },
    {
        id: 't12',
        type: 'expense',
        value: 1200.00,
        description: 'Novo Monitor',
        category: 'Tecnologia',
        date: new Date().toISOString(),
        accountId: 'card2',
        memberId: '1',
        status: 'completed',
        isRecurring: false,
        isPaid: true
    }
];
