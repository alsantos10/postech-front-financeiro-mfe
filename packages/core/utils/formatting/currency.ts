export const formatCurrency = (numberValue: number) => { 
    const value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(numberValue);
    return value;
}