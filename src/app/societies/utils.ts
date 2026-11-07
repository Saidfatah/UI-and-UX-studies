export function wait(duration: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

export function easeInOutCubic(x: number): number {
    return x < 0.5
        ? 4 * x * x * x
        : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export  function pickRandom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

