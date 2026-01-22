import { useRef, useState, useEffect } from 'react';

interface AnimatedValueProps {
    value: number;
    duration?: number;
    formatFn?: (val: number) => string;
}

export function AnimatedValue({ value, duration = 800, formatFn }: AnimatedValueProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const startTime = useRef<number | null>(null);
    const startValue = useRef(0);
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        startValue.current = displayValue;
        startTime.current = null;

        const animate = (timestamp: number) => {
            if (!startTime.current) startTime.current = timestamp;
            const progress = timestamp - startTime.current;

            if (progress < duration) {
                const easeOutQuart = 1 - Math.pow(1 - progress / duration, 4);
                const nextValue = startValue.current + (value - startValue.current) * easeOutQuart;
                setDisplayValue(nextValue);
                animationFrameId.current = requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
            }
        };

        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [value, duration]);

    return <>{formatFn ? formatFn(displayValue) : displayValue.toFixed(2)}</>;
}
