import { Current } from '@/lib/store/slices/board.slice';

interface GameStatusProps {
  current: Current;
  isAILoading: boolean;
  gameMode: 'local' | 'ai';
  totalBlack: number;
  totalWhite: number;
  hasValidMoves: boolean;
}

export function GameStatus({
  current,
  isAILoading,
  gameMode,
  totalBlack,
  totalWhite,
  hasValidMoves,
}: GameStatusProps) {
  if (!hasValidMoves) {
    return (
      <div className="flex items-center justify-center gap-3 bg-zinc-700/50 py-2 px-4 rounded-md">
        <p className="text-sm text-zinc-300">Game Over</p>
        <p className="font-medium">
          {totalBlack > totalWhite
            ? gameMode === 'ai'
              ? 'You won!'
              : 'Black'
            : totalWhite > totalBlack
            ? gameMode === 'ai'
              ? 'AI won!'
              : 'White'
            : "It's a tie!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 bg-zinc-700/50 py-2 px-4 rounded-md">
      <p className="text-sm text-zinc-300">Current turn:</p>
      <div
        className={`w-5 h-5 rounded-full ${
          current === 'B' ? 'bg-black' : 'bg-white'
        } shadow-inner`}
      />
      <div className="font-medium flex items-center gap-2">
        {current === 'B' ? (
          gameMode === 'ai' ? (
            'You'
          ) : (
            'Black'
          )
        ) : isAILoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>AI is thinking</span>
          </>
        ) : gameMode === 'ai' ? (
          'AI'
        ) : (
          'White'
        )}
      </div>
    </div>
  );
}
