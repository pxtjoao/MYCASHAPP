import { twMerge } from 'tailwind-merge';

interface LogoProps {
    variant?: 'default' | 'small';
    className?: string;
}

export function Logo({ variant = 'default', className }: LogoProps) {
    if (variant === 'small') {
        return (
            <div
                className={twMerge(
                    "w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-secondary-900 font-bold shrink-0",
                    className
                )}
            >
                my
            </div>
        );
    }

    return (
        <div className={twMerge("flex items-center gap-3 overflow-hidden", className)}>
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-secondary-900 font-bold shrink-0">
                my
            </div>
            <span className="font-bold text-xl text-secondary-900 whitespace-nowrap">
                mycash+
            </span>
        </div>
    );
}
