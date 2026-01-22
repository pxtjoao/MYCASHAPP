import { createContext, ReactNode, useState, useEffect } from 'react';
import {
    Transaction,
    FamilyMember,
    CreditCard,
    BankAccount,
    Goal
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
    // Actions can be added here later (addTransaction, etc.)
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [members, setMembers] = useState<FamilyMember[]>([]);
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [currentMember, setCurrentMember] = useState<FamilyMember | null>(null);

    useEffect(() => {
        // Load mock data
        setTransactions(MOCK_TRANSACTIONS);
        setMembers(MOCK_MEMBERS);
        setAccounts(MOCK_ACCOUNTS);
        setCards(MOCK_CARDS);
        setGoals(MOCK_GOALS);

        // Set default member
        if (MOCK_MEMBERS.length > 0) {
            setCurrentMember(MOCK_MEMBERS[0]);
        }
    }, []);

    return (
        <FinanceContext.Provider value={{
            transactions,
            members,
            accounts,
            cards,
            goals,
            currentMember,
            setCurrentMember
        }}>
            {children}
        </FinanceContext.Provider>
    );
}
