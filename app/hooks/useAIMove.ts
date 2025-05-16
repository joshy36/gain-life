import { useAppSelector, useAppDispatch } from '@/lib/store';
import { playMove } from '@/lib/store/slices/boardSlice';
import { useState, useEffect } from 'react';

export function useAIMove(gameMode: 'local' | 'ai') {
  const { board, validMoves, current, scores, boardSize } = useAppSelector(
    (state) => state.board
  );
  const dispatch = useAppDispatch();
  const [isAILoading, setIsAILoading] = useState(false);

  const handleAIMove = async () => {
    try {
      setIsAILoading(true);
      let attempts = 0;
      let validMoveFound = false;
      const failedMoves: { x: number; y: number }[] = [];

      while (attempts < 3 && !validMoveFound) {
        const res = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: `You are playing a game of Othello/Reversi. Here is the current board state:
Board Size: ${boardSize}x${boardSize}
Current Player: ${current === 'B' ? 'Black' : 'White'}
Score - Black: ${scores['B']}, White: ${scores['W']}
Board State:
${board.map((row) => row.map((cell) => cell || '.').join(' ')).join('\n')}

Valid Moves (marked with 'V'):
${validMoves
  .map((row, y) => row.map((isValid, x) => (isValid ? 'V' : '.')).join(' '))
  .join('\n')}

${
  failedMoves.length > 0
    ? `Previously attempted invalid moves: ${failedMoves
        .map((move) => `(${move.x},${move.y})`)
        .join(', ')}`
    : ''
}

Please analyze the board and suggest the best move for the current player (White). 
Consider:
1. The number of pieces that would be flipped
2. Strategic positions (corners and edges are valuable)
3. Mobility (maintaining more valid moves for future turns)
4. Current score and board control
5. DO NOT suggest any of the previously attempted invalid moves`,
            validMoves: validMoves,
            failedMoves: failedMoves,
          }),
        });

        if (!res.ok) {
          console.error('AI response not OK:', res.status);
          throw new Error('Failed to get AI response');
        }

        const data = await res.json();
        const { recommendedMove } = data.response;

        if (
          recommendedMove &&
          validMoves[recommendedMove.y]?.[recommendedMove.x]
        ) {
          dispatch(playMove({ x: recommendedMove.x, y: recommendedMove.y }));
          validMoveFound = true;
        } else {
          console.warn(
            `Invalid AI move suggested (attempt ${attempts + 1}/3):`,
            recommendedMove
          );
          if (recommendedMove) {
            failedMoves.push(recommendedMove);
          }
          attempts++;
        }
      }

      if (!validMoveFound) {
        console.error('AI failed to provide a valid move after 3 attempts');
      }
    } catch (err) {
      console.error('Error making AI move:', err);
    } finally {
      setIsAILoading(false);
    }
  };

  useEffect(() => {
    if (
      gameMode === 'ai' &&
      current === 'W' &&
      validMoves.some((row) => row.some((cell) => cell))
    ) {
      handleAIMove();
    }
  }, [gameMode, current, validMoves]);

  return { isAILoading };
}
