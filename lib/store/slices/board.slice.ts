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
  boardSize: number;
}

const createInitialBoard = (size: number) => {
  const half = size / 2;
  return Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) =>
      (y === half - 1 && x === half - 1) || (y === half && x === half)
        ? 'W'
        : (y === half - 1 && x === half) || (y === half && x === half - 1)
        ? 'B'
        : null
    )
  );
};

const createInitialState = (size: number): BoardState => ({
  board: createInitialBoard(size),
  current: 'B',
  totalWhite: 2,
  totalBlack: 2,
  boardSize: size,
  validMoves: generateValidMoves({
    board: createInitialBoard(size),
    current: 'B',
    totalWhite: 2,
    totalBlack: 2,
    boardSize: size,
    validMoves: Array.from({ length: size }, () => Array(size).fill(false)),
  }),
});

const initialState = createInitialState(8);

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
      const newState = createInitialState(state.boardSize);
      Object.assign(state, newState);
    },
    setBoardSize(state, action: PayloadAction<number>) {
      const newSize = action.payload;
      if (newSize % 2 !== 0) return;

      const newState = createInitialState(newSize);
      Object.assign(state, newState);
    },
  },
});

export const { playMove, reset, setBoardSize } = boardSlice.actions;
export default boardSlice.reducer;
