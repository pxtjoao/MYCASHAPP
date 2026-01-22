import { useState } from 'react';
import { CreditCard as CardIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useFinance } from '../../hooks/useFinance';
import { formatCurrency } from '../../utils/format';

export function CreditCardsWidget() {
    const { cards } = useFinance();
    const [currentPage, setCurrentPage] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const itemsPerPage = 3;
    const minSwipeDistance = 50;

    const totalPages = Math.ceil(cards.length / itemsPerPage);
    const displayedCards = cards.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const getThemeStyles = (theme?: string) => {
        switch (theme) {
            case 'black':
                return {
                    iconBlock: 'bg-neutral-900 text-white',
                    badge: 'bg-neutral-900 text-white'
                };
            case 'lime': // Using 'lime' or similar keywords
                return {
                    iconBlock: 'bg-lime-500 text-secondary-900',
                    badge: 'bg-lime-100 text-lime-700'
                };
            case 'blue':
                return {
                    iconBlock: 'bg-blue-600 text-white',
                    badge: 'bg-blue-100 text-blue-700'
                };
            case 'orange':
                return {
                    iconBlock: 'bg-orange-500 text-white',
                    badge: 'bg-orange-100 text-orange-700'
                };
            default:
                return {
                    iconBlock: 'bg-secondary-100 text-secondary-900 border border-secondary-200',
                    badge: 'bg-secondary-100 text-secondary-600'
                };
        }
    };

    const handlePageChange = (direction: 'next' | 'prev') => {
        if (direction === 'next' && currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        } else if (direction === 'prev' && currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handlePageChange('next'); // Swipe left -> Next page
        }
        if (isRightSwipe) {
            handlePageChange('prev'); // Swipe right -> Prior page
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-secondary-50 h-full min-h-[360px] flex flex-col justify-between shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-900 flex items-center justify-center">
                        <CardIcon size={20} className="text-primary-500" />
                    </div>
                    <h2 className="text-xl font-bold text-secondary-900">Cartões</h2>
                </div>

                <button
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary-900 border border-transparent hover:border-secondary-50 transition-all hover:bg-secondary-50 group"
                    title="Adicionar novo cartão"
                >
                    <Plus size={20} className="text-secondary-900" />
                </button>
            </div>

            {/* Cards List */}
            <div className="flex flex-col gap-4 flex-1 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {displayedCards.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-neutral-400 text-sm border-2 border-dashed border-secondary-100 rounded-2xl">
                        Nenhum cartão cadastrado.
                    </div>
                ) : (
                    displayedCards.map(card => {
                        const { iconBlock, badge } = getThemeStyles(card.theme);
                        const formattedBill = formatCurrency(card.currentBill);
                        const percentage = card.limit > 0
                            ? Math.round((card.currentBill / card.limit) * 100)
                            : 0;

                        return (
                            <button
                                key={card.id}
                                className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-transparent hover:border-primary-500/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-left h-[80px]"
                            >
                                {/* Left: Icon Block */}
                                <div className={clsx(
                                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                                    iconBlock
                                )}>
                                    {/* If specific logo assets existed we would use them, else generic icon */}
                                    <CardIcon size={24} strokeWidth={1.5} />
                                </div>

                                {/* Center: Info */}
                                <div className="flex flex-col flex-1 px-4 min-w-0">
                                    <span className="text-xs text-neutral-500 font-medium truncate">{card.name}</span>
                                    <span className="text-lg font-bold text-secondary-900 truncate tracking-tight">{formattedBill}</span>
                                    <span className="text-xs text-neutral-400 font-medium">•••• {card.lastDigits}</span>
                                </div>

                                {/* Right: Usage Badge */}
                                <div className={clsx(
                                    "px-3 py-1.5 rounded-full text-xs font-bold shrink-0",
                                    badge
                                )}>
                                    {percentage}%
                                </div>
                            </button>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-2 border-t border-secondary-200/50">
                    <span className="text-xs text-neutral-400 font-medium ml-2">
                        Página {currentPage + 1} de {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange('prev')}
                            disabled={currentPage === 0}
                            className="w-8 h-8 rounded-full bg-white border border-secondary-50 flex items-center justify-center text-secondary-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={() => handlePageChange('next')}
                            disabled={currentPage === totalPages - 1}
                            className="w-8 h-8 rounded-full bg-white border border-secondary-50 flex items-center justify-center text-secondary-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-100 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
