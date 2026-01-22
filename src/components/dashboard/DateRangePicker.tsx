import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useFinance } from '../../hooks/useFinance';
import { MONTHS, DAYS, getDaysInMonth, getFirstDayOfMonth, isSameDay, formatDateRange } from '../../utils/date';

export function DateRangePicker() {
    const { filters, setDateRange } = useFinance();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // View state for navigation (shows 2 months starting from viewDate)
    const [viewDate, setViewDate] = useState(new Date());

    // Temporary selection state before confirming
    const [selection, setSelection] = useState<{ start: Date | null; end: Date | null }>({
        start: filters.dateRange.startDate,
        end: filters.dateRange.endDate
    });

    // Sync selection with context on open
    useEffect(() => {
        if (isOpen) {
            setSelection({ start: filters.dateRange.startDate, end: filters.dateRange.endDate });
            setViewDate(filters.dateRange.startDate);
        }
    }, [isOpen, filters.dateRange]);

    // Click Outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleDayClick = (date: Date) => {
        if (!selection.start || (selection.start && selection.end)) {
            // Start new selection
            setSelection({ start: date, end: null });
        } else {
            // End selection
            // Ensure start is before end
            if (date < selection.start) {
                setSelection({ start: date, end: selection.start });
            } else {
                setSelection({ start: selection.start, end: date });
            }
        }
    };

    const handleApply = () => {
        if (selection.start && selection.end) {
            setDateRange({ startDate: selection.start, endDate: selection.end });
            setIsOpen(false);
        }
    };

    const handlePreset = (preset: 'thisMonth' | 'lastMonth' | 'last3Months' | 'thisYear') => {
        const now = new Date();
        let start, end;

        switch (preset) {
            case 'thisMonth':
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            case 'lastMonth':
                start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                end = new Date(now.getFullYear(), now.getMonth(), 0);
                break;
            case 'last3Months':
                start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
                end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            case 'thisYear':
                start = new Date(now.getFullYear(), 0, 1);
                end = new Date(now.getFullYear(), 11, 31);
                break;
        }

        setDateRange({ startDate: start, endDate: end });
        setIsOpen(false);
    }

    const changeMonth = (offset: number) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };


    const renderMonth = (dateOffset: number) => {
        const currentMonthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + dateOffset, 1);
        const year = currentMonthDate.getFullYear();
        const month = currentMonthDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];
        // Empty slots
        for (let i = 0; i < firstDay; i++) days.push(null);
        // Days
        for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

        return (
            <div className="w-full">
                <div className="flex items-center justify-center font-semibold text-secondary-900 mb-4 capitalize">
                    {MONTHS[month]} {year}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {DAYS.map(d => <span key={d} className="text-xs text-neutral-400 font-medium">{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {days.map((date, idx) => {
                        if (!date) return <div key={`empty-${idx}`} />;

                        let isSelected = false;
                        let isInRange = false;
                        let isStart = false;
                        let isEnd = false;

                        if (selection.start) {
                            if (isSameDay(date, selection.start)) { isSelected = true; isStart = true; }
                        }
                        if (selection.end) {
                            if (isSameDay(date, selection.end)) { isSelected = true; isEnd = true; }
                        }
                        if (selection.start && selection.end) {
                            if (date > selection.start && date < selection.end) isInRange = true;
                        }

                        return (
                            <button
                                key={date.toISOString()}
                                onClick={() => handleDayClick(date)}
                                className={clsx(
                                    "h-9 w-9 flex items-center justify-center text-sm rounded-full transition-all relative z-10",
                                    isSelected
                                        ? "bg-secondary-900 text-white font-bold shadow-md scale-105"
                                        : isInRange
                                            ? "bg-neutral-100 text-secondary-900"
                                            : "text-secondary-900 hover:bg-neutral-100",
                                    // Connect range visually
                                    isInRange && "bg-neutral-100",
                                    // Rounded corners for range ends
                                    isStart && "rounded-l-full",
                                    isEnd && "rounded-r-full",
                                    // Reset rounded if in range but not end
                                    isInRange && !isStart && !isEnd && "rounded-none w-full"
                                )}
                            >
                                {date.getDate()}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium whitespace-nowrap",
                    isOpen
                        ? "bg-white border-primary-500 ring-2 ring-primary-500/20 text-secondary-900"
                        : "bg-white border-secondary-50 text-secondary-900 hover:border-secondary-900"
                )}
            >
                <CalendarIcon size={18} className="text-secondary-900" />
                <span>{formatDateRange(filters.dateRange.startDate, filters.dateRange.endDate)}</span>
            </button>

            {isOpen && (
                <div className="absolute top-14 left-0 lg:left-0 z-50 bg-white border border-secondary-50 shadow-2xl rounded-3xl p-6 animate-in fade-in zoom-in-95 origin-top-left w-[340px] md:w-[680px]">
                    <div className="flex flex-col gap-6">
                        {/* Shortcuts */}
                        <div className="flex flex-wrap gap-2 pb-6 border-b border-secondary-50">
                            <button onClick={() => handlePreset('thisMonth')} className="px-3 py-1.5 rounded-lg bg-secondary-50 text-xs font-semibold hover:bg-neutral-200 text-secondary-900">Este mês</button>
                            <button onClick={() => handlePreset('lastMonth')} className="px-3 py-1.5 rounded-lg bg-white border border-secondary-50 text-xs font-medium hover:bg-secondary-50 text-secondary-900">Mês passado</button>
                            <button onClick={() => handlePreset('last3Months')} className="px-3 py-1.5 rounded-lg bg-white border border-secondary-50 text-xs font-medium hover:bg-secondary-50 text-secondary-900">Últimos 3 meses</button>
                            <button onClick={() => handlePreset('thisYear')} className="px-3 py-1.5 rounded-lg bg-white border border-secondary-50 text-xs font-medium hover:bg-secondary-50 text-secondary-900">Este ano</button>
                        </div>

                        {/* Calendars */}
                        <div className="flex flex-col md:flex-row gap-8 items-start relative">
                            <button onClick={() => changeMonth(-1)} className="absolute left-0 top-1 p-1 hover:bg-neutral-100 rounded-full"><ChevronLeft size={20} /></button>
                            <button onClick={() => changeMonth(1)} className="absolute right-0 top-1 p-1 hover:bg-neutral-100 rounded-full"><ChevronRight size={20} /></button>

                            {renderMonth(0)}
                            <div className="hidden md:block w-full">
                                {renderMonth(1)}
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-between items-center pt-4 border-t border-secondary-50">
                            <div className="text-xs text-neutral-500">
                                {selection.start && selection.end ? formatDateRange(selection.start, selection.end) : 'Selecione um período'}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-secondary-900">Cancelar</button>
                                <button onClick={handleApply} className="px-6 py-2 bg-secondary-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-secondary-800 transition-colors">
                                    Aplicar Filtro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
