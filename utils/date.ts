export function toDateForm(date: Date | string | null, start: number = 0): string {
    if (!date) return "";
    const parsedDate = new Date(date);
    parsedDate.setDate(parsedDate.getDate() + start); // Subtract 'start' days
    return parsedDate.toISOString().slice(0, 16);
}

export const toDate = (dateString: number | string | Date) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}