import type { Piece, Current } from './boardSlice';

const placeCornerBlock = (
  board: Piece[][],
  x: number,
  y: number,
  playerA: Current,
  playerB: Current
) => {
  // Standard 2x2 block: playerB (like White), playerA (like Black)
  // B A
  // A B
  if (board.length > y + 1 && board[0].length > x + 1) {
    board[y][x] = playerB;
    board[y][x + 1] = playerA;
    board[y + 1][x] = playerA;
    board[y + 1][x + 1] = playerB;
  }
};

export const createInitialBoard = (
  size: number,
  players: Current[]
): Piece[][] => {
  const board = Array.from({ length: size }, () =>
    Array(size).fill(null)
  ) as Piece[][];

  if (players.length === 2 && size >= 2) {
    const half = size / 2;
    // Standard 2-player Othello setup (2 pieces each)
    board[half - 1][half - 1] = players[1]; // Top-left of center quad (e.g., D4 for White)
    board[half][half] = players[1]; // Bottom-right of center quad (e.g., E5 for White)
    board[half - 1][half] = players[0]; // Top-right of center quad (e.g., E4 for Black)
    board[half][half - 1] = players[0]; // Bottom-left of center quad (e.g., D5 for Black)
  } else {
    // For 4, 6, or 8 players, use corner block strategy
    if (size < 2) return board; // Not enough space for even one block

    let currentCornerCoordinates: Array<{ x: number; y: number }>;

    if (size >= 6) {
      // Shifted placement for boards 6x6 or larger
      currentCornerCoordinates = [
        { x: 1, y: 1 }, // Top-Left shifted
        { x: size - 3, y: 1 }, // Top-Right shifted
        { x: 1, y: size - 3 }, // Bottom-Left shifted
        { x: size - 3, y: size - 3 }, // Bottom-Right shifted
      ];
    } else {
      // Original corner placement for smaller boards (size 2 or 4)
      // For size=2, size-2 = 0, so all coords become {x:0, y:0}
      currentCornerCoordinates = [
        { x: 0, y: 0 }, // Top-Left
        { x: size - 2, y: 0 }, // Top-Right
        { x: 0, y: size - 2 }, // Bottom-Left
        { x: size - 2, y: size - 2 }, // Bottom-Right
      ];
    }

    // Determine how many pairs of players (blocks) to place
    // Ensure we don't try to place more blocks than available players or corners
    const numPlayerPairs = Math.floor(players.length / 2);
    const blocksToPlace = Math.min(
      numPlayerPairs,
      currentCornerCoordinates.length
    );

    for (let i = 0; i < blocksToPlace; i++) {
      // Additional checks for board size relative to corners being used might be needed
      // if we strictly wanted to prevent overlap on very small boards (e.g. size 2 for >2 players)
      // but given boardSize min is 4 for the game, this is less of an issue.
      // The placeCornerBlock function has internal boundary checks anyway.

      const playerA = players[i * 2];
      const playerB = players[i * 2 + 1];
      // This check should be redundant given blocksToPlace logic, but good for safety
      if (!playerA || !playerB) break;

      let coordIndex = i;
      // For a 4-player game (blocksToPlace will be 2),
      // use the top-left for the first block (i=0)
      // and bottom-right for the second block (i=1).
      // The bottom-right coordinate is the last one in currentCornerCoordinates.
      if (blocksToPlace === 2 && i === 1) {
        coordIndex = currentCornerCoordinates.length - 1;
      }

      const { x, y } = currentCornerCoordinates[coordIndex];
      placeCornerBlock(board, x, y, playerA, playerB);
    }
  }
  return board;
};
