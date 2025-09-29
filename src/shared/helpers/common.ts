export function generateRandomValue(min: number, max: number, fraction: number = 0): number {
    return +((Math.random() * (max - min)) + min).toFixed(fraction);
}

export function generateRandomDate(start: Date, end: Date): Date {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomDate = Math.random() * (endTime - startTime) + startTime;
    return new Date(randomDate);
}

export function getRandomItems<T>(items: T[]): T[] {
    const startPos = generateRandomValue(0, items.length - 1);
    const endPos = generateRandomValue(startPos, items.length);
    return items.slice(startPos, endPos);
}

export function getRandomItem<T>(items: T[]): T {
    return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : '';
}
