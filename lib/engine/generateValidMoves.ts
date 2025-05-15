import { BoardState } from '../store/slices/board.slice';
import { checkBounds, directions } from './utils';

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

const isValid = (state: BoardState, row: number, col: number): boolean => {
  if (state.board[row][col] !== null) return false;

  return directions.some(([rowDir, colDir]) =>
    checkDirection(state, row, col, rowDir, colDir)
  );
};

export const generateValidMoves = (state: BoardState): boolean[][] => {
  const validMoves = Array.from({ length: state.board.length }, () =>
    Array.from({ length: state.board[0].length }, () => false)
  );

  for (let row = 0; row < state.board.length; row++) {
    for (let col = 0; col < state.board[0].length; col++) {
      if (isValid(state, row, col)) {
        validMoves[row][col] = true;
      }
    }
  }

  return validMoves;
};
