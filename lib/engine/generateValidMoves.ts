import { BoardState } from '../store/slices/board.slice';

const checkBounds = (state: BoardState, row: number, col: number): boolean => {
  return (
    row >= 0 &&
    row < state.board.length &&
    col >= 0 &&
    col < state.board[0].length
  );
};

const checkDirection = (
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

  const directions = [
    [0, 1], // right
    [1, 1], // down-right
    [1, 0], // down
    [1, -1], // down-left
    [0, -1], // left
    [-1, -1], // up-left
    [-1, 0], // up
    [-1, 1], // up-right
  ];

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
