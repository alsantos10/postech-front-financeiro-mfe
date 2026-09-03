export const capitalize = (word: string) => {
    if (!word) return "";
    return `${word.toLowerCase().charAt(0).toUpperCase()}${word.toLowerCase().slice(1)}`
}