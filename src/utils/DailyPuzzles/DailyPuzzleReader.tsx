import puzzles from './daily-puzzles.json';

export function getLetters(day: string): string[] {
  const entry = puzzles[day as keyof typeof puzzles];
  if (!entry || !entry.Letters) {
    return [];
  }
  return entry.Letters
    .map(letter => letter.toUpperCase())
    .sort((a, b) => a.localeCompare(b));
}