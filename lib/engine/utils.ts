import { BoardState } from '../store/slices/board.slice';

export const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const checkBounds = (
  state: BoardState,
  row: number,
  col: number
): boolean => {
  return (
    row >= 0 &&
    row < state.board.length &&
    col >= 0 &&
    col < state.board[0].length
  );
};

export const checkDirection = (
  state: BoardState,
  row: number,
  col: number,
  rowDir: number,
  colDir: number
): boolean => {
  const opponent = state.current === 'B' ? 'W' : 'B';
  row += rowDir;
  col += colDir;

  let hasOpponent = false;

  while (checkBounds(state, row, col)) {
    const cell = state.board[row][col];

    if (cell === null) return false;
    if (cell === opponent) {
      hasOpponent = true;
    } else if (cell === state.current) {
      return hasOpponent;
    } else {
      return false;
    }

    row += rowDir;
    col += colDir;
  }

  return false;
};
