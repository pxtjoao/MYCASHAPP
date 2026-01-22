import { BalanceCard } from '../components/dashboard/BalanceCard';
import { IncomeCard } from '../components/dashboard/IncomeCard';
import { ExpenseCard } from '../components/dashboard/ExpenseCard';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { ExpensesCarousel } from '../components/dashboard/ExpensesCarousel';
import { FinancialFlowChart } from '../components/dashboard/FinancialFlowChart';
import { CreditCardsWidget } from '../components/dashboard/CreditCardsWidget';
import { UpcomingExpensesWidget } from '../components/dashboard/UpcomingExpensesWidget';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6">
            <DashboardHeader />

            {/* 1. Top Section: Summary, Carousel & Credit Cards */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Summary & Carousel */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <BalanceCard />
                        </div>
                        <IncomeCard />
                        <ExpenseCard />
                    </div>

                    {/* Expenses Carousel */}
                    <div>
                        <ExpensesCarousel />
                    </div>
                </div>

                {/* Right Column: Credit Cards */}
                <div className="lg:col-span-1">
                    <CreditCardsWidget />
                </div>
            </section>

            {/* Bottom Section: Flow Chart & Upcoming Expenses */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <FinancialFlowChart />
                </div>
                <div className="lg:col-span-1">
                    <UpcomingExpensesWidget />
                </div>
            </section>

            <div className="p-8 border border-dashed border-neutral-300 rounded-xl flex items-center justify-center text-neutral-500">
                Future Dashboard Content
            </div>
        </div>
    );
}
