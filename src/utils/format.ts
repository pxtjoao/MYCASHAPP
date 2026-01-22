export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

export const formatPercent = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
        signDisplay: 'exceptZero'
    }).format(value / 100);
}
