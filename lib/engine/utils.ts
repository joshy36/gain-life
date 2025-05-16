import { BoardState } from '../store/slices/boardSlice';

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
): [number, number][] => {
  row += rowDir;
  col += colDir;

  const piecesToFlip: [number, number][] = [];

  while (checkBounds(state, row, col)) {
    const cell = state.board[row][col];

    if (cell === null) return [];
    if (cell !== state.current) {
      piecesToFlip.push([col, row]);
    } else if (cell === state.current) {
      return piecesToFlip;
    }

    row += rowDir;
    col += colDir;
  }

  return [];
};
