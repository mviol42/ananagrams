import puzzles from './daily-puzzles.json'

export function getLetters(day: string) {
    return [...puzzles[day as keyof typeof puzzles].Letters];
}

export function getTheme(day: string) {
    const theme = puzzles[day as keyof typeof puzzles].Theme
    return  `Today\'s Theme: ${theme ? theme : "Themeless"}`;
}