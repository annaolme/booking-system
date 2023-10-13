export function generateTimeSlots(start: number = 9, end: number = 17, interval: number = 30): string[] {
    const slots: string[] = [];
    for (let hour = start; hour < end; hour++) {
        for (let min = 0; min < 60; min += interval) {
            slots.push(
                `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
            );
        }
    }
    return slots;
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('fi-FI', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}
