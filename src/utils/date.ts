export const MONTHS = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

export function formatDateRange(startDate: Date, endDate: Date) {
    const start = startDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    const end = endDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    // Example: 01 jan - 31 jan, 2024
    // Simple concat
    return `${start} - ${end}`;
}

export function isSameDay(d1: Date, d2: Date) {
    return d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();
}

export function isWithinRange(date: Date, start: Date, end: Date) {
    return date >= start && date <= end;
}
