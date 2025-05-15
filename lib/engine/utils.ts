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
