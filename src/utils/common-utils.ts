export const firstLetterToUpperCase = (field: string) => {
    return (field[0].toUpperCase() + field.slice(1))
        .replace(/[A-Z]/g, (l, i) => i > 0 ? ` ${l}` : l)
}