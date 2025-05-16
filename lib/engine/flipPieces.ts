import { BoardState, Piece } from '@/lib/store/slices/boardSlice';
import { checkDirection, directions } from './utils';

export function flipPieces(state: BoardState, x: number, y: number): void {
  const { board, current, scores } = state;

  for (const [dx, dy] of directions) {
    const piecesInDirectionToFlip = checkDirection(state, y, x, dy, dx);

    for (const [flipX, flipY] of piecesInDirectionToFlip) {
      const originalPieceColor = board[flipY][flipX] as Piece;

      if (originalPieceColor && originalPieceColor !== current) {
        board[flipY][flipX] = current;
        scores[current]++;
        scores[originalPieceColor]--;
      }
    }
  }
}
