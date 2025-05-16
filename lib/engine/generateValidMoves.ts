import { BoardState } from '../store/slices/boardSlice';
import { checkDirection, directions } from './utils';

const isValid = (state: BoardState, row: number, col: number): boolean => {
  if (state.board[row][col] !== null) return false;

  return directions.some(
    ([rowDir, colDir]) =>
      checkDirection(state, row, col, rowDir, colDir).length > 0
  );
};

export const generateValidMoves = (state: BoardState): boolean[][] => {
  const { boardSize } = state;
  const validMoves = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => false)
  );

  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      if (isValid(state, r, c)) {
        validMoves[r][c] = true;
      }
    }
  }

  return validMoves;
};
