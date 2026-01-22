import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { useFinance } from '../../hooks/useFinance';
import { TransactionFilterType } from '../../types';

export function FilterButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { filters, setTransactionType } = useFinance();
    const popoverRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                !buttonRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const options: { label: string; value: TransactionFilterType }[] = [
        { label: 'Todos', value: 'all' },
        { label: 'Receitas', value: 'income' },
        { label: 'Despesas', value: 'expense' }
    ];

    const handleSelect = (value: TransactionFilterType) => {
        setTransactionType(value);
        setIsOpen(false);
    }

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center border transition-all",
                    isOpen || filters.transactionType !== 'all'
                        ? "bg-secondary-900 border-secondary-900 text-white"
                        : "bg-white border-secondary-50 text-neutral-500 hover:border-secondary-900 hover:text-secondary-900"
                )}
            >
                <SlidersHorizontal size={18} />
            </button>

            {isOpen && (
                <div
                    ref={popoverRef}
                    className="absolute top-12 left-0 z-30 w-56 bg-white/90 backdrop-blur-xl border border-secondary-50 shadow-xl rounded-2xl p-2 animate-in fade-in zoom-in-95 origin-top-left"
                >
                    <div className="px-2 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Tipo de Transação
                    </div>
                    <div className="flex flex-col gap-1">
                        {options.map((option) => {
                            const isSelected = filters.transactionType === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={clsx(
                                        "flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all w-full",
                                        isSelected
                                            ? "bg-secondary-900 text-white shadow-md"
                                            : "text-secondary-900 hover:bg-secondary-50"
                                    )}
                                >
                                    {option.label}
                                    {isSelected && <Check size={14} className="text-primary-500" />}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
