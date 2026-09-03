export const convertDate = (dateString?: string | Date): string => {
    if (!dateString) return '';
    console.log("date", dateString);
    return new Date(dateString).toLocaleDateString("pt-BR");
}

export const getDateName = (dateString?: string | Date): string => {
    if (!dateString) return '';
    const convertDate = new Date(dateString) || null;
    return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(convertDate); 
}