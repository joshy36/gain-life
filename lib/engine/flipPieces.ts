import { BoardState } from '@/lib/store/slices/board.slice';
import { checkBounds, directions } from './utils';

const checkDirection = (
  state: BoardState,
  row: number,
  col: number,
  rowDir: number,
  colDir: number
): [number, number][] => {
  const opponent = state.current === 'B' ? 'W' : 'B';
  row += rowDir;
  col += colDir;

  const piecesToFlip: [number, number][] = [];

  while (checkBounds(state, row, col)) {
    const cell = state.board[row][col];

    if (cell === null) return [];
    if (cell === opponent) {
      piecesToFlip.push([col, row]);
    } else if (cell === state.current) {
      return piecesToFlip;
    } else {
      return [];
    }

    row += rowDir;
    col += colDir;
  }

  return [];
};

export function flipPieces(state: BoardState, x: number, y: number): void {
  const { board, current } = state;

  for (const [dx, dy] of directions) {
    const piecesToFlip = checkDirection(state, y, x, dy, dx);

    for (const [flipX, flipY] of piecesToFlip) {
      board[flipY][flipX] = current;
      if (current === 'B') {
        state.totalBlack++;
        state.totalWhite--;
      } else {
        state.totalWhite++;
        state.totalBlack--;
      }
    }
  }
}
