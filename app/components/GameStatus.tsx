import React from 'react';
import { Current } from '@/lib/store/slices/boardSlice';
import { playerPieceColors } from '../utils/colors';

interface GameStatusProps {
  current: Current;
  isAILoading: boolean;
  gameMode: 'local' | 'ai';
  scores: Record<Current, number>;
  orderedPlayers: Current[];
  hasValidMoves: boolean;
  playerDisplayNames: Partial<Record<Current, string>>;
}

export function GameStatus({
  current,
  isAILoading,
  gameMode,
  scores,
  orderedPlayers,
  hasValidMoves,
  playerDisplayNames,
}: GameStatusProps) {
  if (!hasValidMoves) {
    let winnerMessageElement: React.ReactNode = "It's a tie!";

    if (gameMode === 'ai') {
      const playerScore = scores['B'] ?? 0;
      const aiScore = scores['W'] ?? 0;

      if (playerScore > aiScore) {
        const winnerKey: Current = 'B';
        const winnerName = playerDisplayNames[winnerKey] || 'Player';
        winnerMessageElement = (
          <span className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                playerPieceColors[winnerKey] || 'bg-gray-300'
              } shadow-inner mr-2`}
            />
            {winnerName} won!
          </span>
        );
      } else if (aiScore > playerScore) {
        const winnerKey: Current = 'W';
        const winnerName = playerDisplayNames[winnerKey] || 'AI';
        winnerMessageElement = (
          <span className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                playerPieceColors[winnerKey] || 'bg-gray-300'
              } shadow-inner mr-2`}
            />
            {winnerName} won!
          </span>
        );
      }
      // Tie case defaults to "It's a tie!"
    } else {
      // Local multiplayer mode
      let highestScore = -1;
      let winners: Current[] = [];
      for (const player of orderedPlayers) {
        const score = scores[player] ?? 0;
        if (score > highestScore) {
          highestScore = score;
          winners = [player];
        } else if (score === highestScore) {
          winners.push(player);
        }
      }

      if (winners.length === 1 && highestScore > -1) {
        const winnerKey = winners[0];
        const winnerName = playerDisplayNames[winnerKey] || winnerKey;
        winnerMessageElement = (
          <span className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                playerPieceColors[winnerKey] || 'bg-gray-300'
              } shadow-inner mr-2`}
            />
            {winnerName} won!
          </span>
        );
      }
      // Tie case (winners.length > 1 or no one scored significantly) defaults to "It's a tie!"
    }

    return (
      <div className="flex items-center justify-center gap-3 bg-zinc-700/50 py-2 px-4 rounded-md">
        <p className="text-sm text-zinc-300">Game Over</p>
        <div className="font-medium">{winnerMessageElement}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 bg-zinc-700/50 py-2 px-4 rounded-md">
      <p className="text-sm text-zinc-300">Current turn:</p>
      <div
        className={`w-5 h-5 rounded-full ${
          playerPieceColors[current] || 'bg-gray-300'
        } shadow-inner`}
      />
      <div className="font-medium flex items-center gap-2">
        {current === 'B' ? (
          gameMode === 'ai' ? (
            'You'
          ) : (
            'Black'
          )
        ) : isAILoading && playerDisplayNames[current] === 'AI' ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>AI is thinking</span>
          </>
        ) : gameMode === 'ai' ? (
          'AI'
        ) : (
          playerDisplayNames[current] || current
        )}
      </div>
    </div>
  );
}
