This codebase supports a daily puzzle game based on the overwhelmingly popular game [bananagrams](https://mviol42.github.io/ananagrams/).
Each day a new puzzle is generated. We do this via generating a random set of 16 tiles and verifying they have at least one solution using this [code](https://github.com/colinclement/banangram#).
We run a cron job via github actions to generate this puzzle.
Enjoy!
