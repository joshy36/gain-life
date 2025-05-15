import { generateValidMoves } from '@/lib/engine/generateValidMoves';
import { flipPieces } from '@/lib/engine/flipPieces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Piece = 'B' | 'W' | null;
export interface Point {
  x: number;
  y: number;
}

export interface BoardState {
  board: Piece[][];
  validMoves: boolean[][];
  current: 'B' | 'W';
  totalWhite: number;
  totalBlack: number;
}

const initialBoard = Array.from({ length: 8 }, (_, y) =>
  Array.from({ length: 8 }, (_, x) =>
    (y === 3 && x === 3) || (y === 4 && x === 4)
      ? 'W'
      : (y === 3 && x === 4) || (y === 4 && x === 3)
      ? 'B'
      : null
  )
);

const initialState: BoardState = {
  board: initialBoard,
  current: 'B',
  totalWhite: 2,
  totalBlack: 2,
  validMoves: generateValidMoves({
    board: initialBoard,
    current: 'B',
    totalWhite: 2,
    totalBlack: 2,
    validMoves: Array.from({ length: 8 }, () => Array(8).fill(false)),
  }),
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    playMove(state, action: PayloadAction<Point>) {
      const { x, y } = action.payload;

      state.board[y][x] = state.current;
      if (state.current == 'B') {
        state.totalBlack++;
      } else {
        state.totalWhite++;
      }
      flipPieces(state, x, y);
      state.current = state.current === 'B' ? 'W' : 'B';
      state.validMoves = generateValidMoves(state);
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { playMove, reset } = boardSlice.actions;
export default boardSlice.reducer;
