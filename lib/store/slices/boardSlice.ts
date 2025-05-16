import { generateValidMoves } from '@/lib/engine/generateValidMoves';
import { flipPieces } from '@/lib/engine/flipPieces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createInitialBoard } from './boardSetup';

const ALL_POSSIBLE_PLAYERS = ['B', 'W', 'R', 'G', 'BL', 'Y', 'O', 'P'] as const;

export type Current = (typeof ALL_POSSIBLE_PLAYERS)[number];
export type Piece = Current | null;

export interface BoardState {
  board: Piece[][];
  validMoves: boolean[][];
  current: Current;
  scores: Record<Current, number>;
  boardSize: number;
  players: Current[];
  numberOfPlayers: number;
}

const createInitialState = (
  size: number,
  numPlayers: number = 2
): BoardState => {
  const selectedPlayers = ALL_POSSIBLE_PLAYERS.slice(0, numPlayers);

  const initialScores = ALL_POSSIBLE_PLAYERS.reduce((acc, player) => {
    acc[player] = 0;
    return acc;
  }, {} as Record<Current, number>);

  // Each player involved in the initial setup gets 2 pieces.
  // We place blocks for pairs of players.
  const numberOfBlocks = Math.floor(numPlayers / 2);
  for (let i = 0; i < numberOfBlocks * 2; i++) {
    if (selectedPlayers[i]) {
      initialScores[selectedPlayers[i]] = 2;
    }
  }
  // If there's an odd player out (not possible with 2,4,6,8 validation, but for robustness)
  // they would start with 0, which is already set.

  const board = createInitialBoard(size, selectedPlayers);

  return {
    board,
    current: selectedPlayers[0],
    scores: initialScores,
    boardSize: size,
    validMoves: generateValidMoves({
      board,
      current: selectedPlayers[0],
      scores: initialScores,
      boardSize: size,
      validMoves: Array.from({ length: size }, () => Array(size).fill(false)),
      players: selectedPlayers,
      numberOfPlayers: selectedPlayers.length,
    }),
    players: selectedPlayers,
    numberOfPlayers: selectedPlayers.length,
  };
};

const initialState = createInitialState(8, 2);

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    playMove(
      state,
      action: PayloadAction<{
        x: number;
        y: number;
      }>
    ) {
      const { x, y } = action.payload;

      state.board[y][x] = state.current;
      state.scores[state.current] = (state.scores[state.current] ?? 0) + 1;
      flipPieces(state, x, y);
      state.current =
        state.players[
          (state.players.indexOf(state.current) + 1) % state.numberOfPlayers
        ];
      state.validMoves = generateValidMoves(state);
    },
    reset(state) {
      const newState = createInitialState(
        state.boardSize,
        state.numberOfPlayers
      );
      Object.assign(state, newState);
    },
    setBoardSize(state, action: PayloadAction<number>) {
      const newSize = action.payload;
      if (newSize % 2 !== 0) return;
      const newState = createInitialState(newSize, state.numberOfPlayers);
      Object.assign(state, newState);
    },
    setNumberOfPlayers(state, action: PayloadAction<number>) {
      const numPlayers = action.payload;
      if (![2, 4, 6, 8].includes(numPlayers)) return;
      const newState = createInitialState(state.boardSize, numPlayers);
      Object.assign(state, newState);
    },
  },
});

export const { playMove, reset, setBoardSize, setNumberOfPlayers } =
  boardSlice.actions;
export default boardSlice.reducer;
