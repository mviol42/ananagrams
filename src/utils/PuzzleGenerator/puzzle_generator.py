import random
from datetime import datetime, timedelta
import os
import json
from graph import DirectedGraph, trie_to_dawg
from bananagram import Bananagrams

# Letter frequencies in English
LETTER_FREQUENCIES = {
    'a': 0.08167, 'b': 0.01492, 'c': 0.02782, 'd': 0.04253,
    'e': 0.12702, 'f': 0.02228, 'g': 0.02015, 'h': 0.06094,
    'i': 0.06966, 'j': 0.00153, 'k': 0.00772, 'l': 0.04025,
    'm': 0.02406, 'n': 0.06749, 'o': 0.07507, 'p': 0.01929,
    'q': 0.00095, 'r': 0.05987, 's': 0.06327, 't': 0.09056,
    'u': 0.02758, 'v': 0.00978, 'w': 0.02360, 'x': 0.00150,
    'y': 0.01974, 'z': 0.00074
}

# Load dictionary graph once
def load_solver():
    lexicon_path = os.path.join(os.path.dirname(__file__), 'data', '10000words.txt')
    G = DirectedGraph()
    with open(lexicon_path, 'r') as f:
        G.parselex(f.read())
    trie_to_dawg(G)
    return Bananagrams(G)

BANANAGRAM_SOLVER = load_solver()

def weighted_random_letters(n=16):
    """Generate n random letters weighted by English frequency."""
    letters = list(LETTER_FREQUENCIES.keys())
    weights = list(LETTER_FREQUENCIES.values())
    return random.choices(letters, weights=weights, k=n)

PUZZLE_FILE = 'test.json'
def load_puzzles():
    puzzles = {}
    if os.path.exists(PUZZLE_FILE):
        with open(PUZZLE_FILE, 'r') as f:
            for line in f:
                if line.strip():
                    obj = json.loads(line)
                    puzzles.update(obj)
    return puzzles

def save_puzzles(puzzles):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Go up one directory (PuzzleGenerator -> utils) and into DailyPuzzles folder
    puzzles_dir = os.path.join(script_dir, '..', 'DailyPuzzles')
    puzzles_dir = os.path.abspath(puzzles_dir)
    os.makedirs(puzzles_dir, exist_ok=True)
    file_path = os.path.join(puzzles_dir, 'daily-puzzles.json')
    with open(file_path, 'w') as f:
        json.dump(puzzles, f, separators=(',', ': '))

def append_daily_puzzle(letters, solution):
    """Append today's puzzle to the JSON file."""
    puzzles = load_puzzles()
    tomorrow = datetime.now() + timedelta(days=1)
    date_str = f"{tomorrow.month}/{tomorrow.day}/{tomorrow.year}"
    puzzles[date_str] = {
        "Letters": letters,
        "Words": solution,
    }
    save_puzzles(puzzles)

if __name__ == '__main__':
    looking_for_solution = True
    while looking_for_solution:  # Keep generating until we find a solvable puzzle
        letters = weighted_random_letters()
        solution = BANANAGRAM_SOLVER.solve([l for l in letters])
        valid, words = BANANAGRAM_SOLVER.validate(solution)
        if valid:
            append_daily_puzzle(letters=letters, solution=words)
            looking_for_solution = False
            