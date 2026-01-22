import { BalanceCard } from '../components/dashboard/BalanceCard';
import { IncomeCard } from '../components/dashboard/IncomeCard';
import { ExpenseCard } from '../components/dashboard/ExpenseCard';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6">
            <DashboardHeader />

            {/* Summary Cards Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card slightly larger in visual weight, but in grid it shares equality or span */}
                <div className="md:col-span-1">
                    <BalanceCard />
                </div>
                <IncomeCard />
                <ExpenseCard />
            </section>

            <div className="p-8 border border-dashed border-neutral-300 rounded-xl flex items-center justify-center text-neutral-500">
                Future Dashboard Content
            </div>
        </div>
    );
}
