## Running Locally

.env file with ANTHROPIC_API_KEY, OPENAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY or any other major provider
Check https://ai-sdk.dev/docs/introduction for more info

```bash
npm intall
```

```bash
npm start
```

## Thought Process

I first started by defining what state we would need in boardSlice. I then moved on to the engine and defining the logic for generating valid moves and flipping pieces. I initially was thinking to to do a dfs from each of the current players pieces to find valid moves but after some discussion with o3 I realised that it would be more efficient to check each empty square and then check each direction from it to see if it could be a valid move. I then built the presentation layer and once local was working I added the ai functionality. Finally, I decided to make the game playable by more than two players so I had to update my previous implementation of the players from a single variable tracking current move and two variablees tracking the score of each player to a record holding all the scores and an array to hold all potential players. A few things I would have liked to add are enable multiplayer AI (right now it only supports playing against one AI) and a display to show past moves in the game and replay the game.

## Note

The one "backend" aspect is the ai call is made in an api route as to not leak the api key to the client.

## AI

I used chatgpt o3 during initial ideation and planning. During implementation I used Cursor with gemini-2.5-pro.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Radix UI
- Zod
- ESLint
