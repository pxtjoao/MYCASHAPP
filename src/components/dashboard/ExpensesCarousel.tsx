import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useFinance } from '../../hooks/useFinance';
import { CategoryDonutCard } from './CategoryDonutCard';
import { CategorySummary } from '../../types';

export function ExpensesCarousel() {
    const { expensesByCategory } = useFinance();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showControls, setShowControls] = useState(false);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        // Map vertical scroll of mouse wheel to horizontal scroll for this container if user wants
        // Prompt: "mouse wheel que move horizontalmente ao girar a rodinha"
        if (scrollRef.current) {
            // Prevent default page scroll if we are scrolling this container? 
            // Usually better to only prevent if we can actually scroll.
            // But for simplicity/requirement compliance:
            scrollRef.current.scrollLeft += e.deltaY;
            // e.preventDefault(); // React synthetic events don't support preventing default on wheel easily for passive listeners.
            // Browsers handle wheel as passive by default. 
            // We can't easily prevent page scroll here, but we can make it scroll horizontally.
        }
    };

    if (expensesByCategory.length === 0) {
        return (
            <div className="w-full h-40 flex items-center justify-center bg-white rounded-3xl border border-dashed border-secondary-50 text-neutral-400 text-sm">
                Nenhuma despesa para exibir no período.
            </div>
        )
    }

    return (
        <div
            className="relative group w-full"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* Left Control */}
            <button
                onClick={() => handleScroll('left')}
                className={clsx(
                    "hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center border border-secondary-50 text-secondary-900 transition-all duration-300",
                    showControls ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                )}
            >
                <ChevronLeft size={20} />
            </button>

            {/* Carousel Container */}
            {/* Mask gradient on edges: "borda esquerda e direita... progressivamente transparentes" */}
            <div className="relative w-full overflow-hidden rounded-3xl">
                {/* Fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background-400 to-transparent z-10 pointer-events-none md:hidden" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background-400 to-transparent z-10 pointer-events-none md:hidden" />

                {/* Scroll Area */}
                <div
                    ref={scrollRef}
                    onWheel={handleWheel}
                    className="flex gap-4 overflow-x-auto pb-4 pt-1 px-0 scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {expensesByCategory.map((category: CategorySummary) => (
                        <CategoryDonutCard key={category.categoryId} data={category} />
                    ))}
                </div>
            </div>

            {/* Right Control */}
            <button
                onClick={() => handleScroll('right')}
                className={clsx(
                    "hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center border border-secondary-50 text-secondary-900 transition-all duration-300",
                    showControls ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                )}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
