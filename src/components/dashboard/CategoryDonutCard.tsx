import { formatCurrency } from '../../utils/format';
import { CategorySummary } from '../../types';

interface CategoryDonutCardProps {
    data: CategorySummary;
}

export function CategoryDonutCard({ data }: CategoryDonutCardProps) {
    const { name, totalValue, percentage, color = '#111827' } = data;

    // Donut chart parameters
    const size = 72;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="min-w-[160px] h-auto bg-white rounded-3xl border border-secondary-50 px-6 py-6 flex flex-col items-center gap-4 shrink-0 transition-colors hover:border-primary-500 group select-none">

            {/* Donut Chart */}
            <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
                <svg width={size} height={size} className="transform -rotate-90">
                    {/* Background Ring (empty/white internally, but typically gray track? Prompt says "anel interno vazio (branco)". 
              Usually a donut has a track. Prompt says "anel externo colorido... anel interno vazio". 
              Let's assume track is not requested or transparent, just the value ring.
              Actually, usually helpful to have a faint track. But prompt didn't ask.
              I will add a very subtle track for better visuals if "anel interno vazio" implies the hole.
          */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#F3F4F6"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <span className="absolute text-xs font-bold text-secondary-900">
                    {percentage.toFixed(1)}%
                </span>
            </div>

            {/* Info */}
            <div className="flex flex-col items-center text-center w-full">
                <span className="text-xs text-neutral-500 font-medium truncate w-full px-1" title={name}>
                    {name}
                </span>
                <span className="text-sm font-bold text-secondary-900 mt-0.5">
                    {formatCurrency(totalValue)}
                </span>
            </div>
        </div>
    );
}
