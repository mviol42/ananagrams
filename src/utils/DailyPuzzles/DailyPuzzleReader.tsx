import puzzles from './daily-puzzles.json'

export function getLetters(day: string) {
    return [...puzzles[day as keyof typeof puzzles].Letters];
}