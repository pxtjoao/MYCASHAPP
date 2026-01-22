import { Search, Plus } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { FilterButton } from './FilterButton';
import { DateRangePicker } from './DateRangePicker';
import { MemberSelector } from './MemberSelector';

export function DashboardHeader() {
    const { filters, setSearchText } = useFinance();

    return (
        <div className="flex flex-col gap-6 mb-8">
            {/* Actions Bar */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    {/* Search */}
                    <div className="flex items-center bg-white border border-secondary-50 rounded-full px-4 py-2.5 w-full lg:w-64 focus-within:ring-2 focus-within:ring-primary-500 transition-all shrink-0">
                        <Search size={20} className="text-neutral-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={filters.searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="bg-transparent border-none outline-none text-secondary-900 placeholder:text-neutral-400 w-full text-sm"
                        />
                    </div>

                    {/* Transaction Type Filter */}
                    <FilterButton />

                    {/* Date Range */}
                    <DateRangePicker />

                    {/* Members */}
                    <div className="pl-2 border-l border-secondary-50 ml-2">
                        <MemberSelector />
                    </div>
                </div>

                {/* Add Transaction Button - Primary Action */}
                <button className="flex items-center justify-center gap-2 bg-secondary-900 hover:bg-secondary-800 text-surface-500 rounded-xl px-5 py-2.5 transition-all active:scale-95 shadow-lg shadow-secondary-900/10 w-full lg:w-auto whitespace-nowrap">
                    <div className="bg-primary-500 rounded-full p-0.5">
                        <Plus size={14} className="text-secondary-900 stroke-[3]" />
                    </div>
                    <span className="font-semibold text-sm">Nova Transação</span>
                </button>
            </div>
        </div>
    );
}
