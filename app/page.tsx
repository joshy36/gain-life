'use client';

import { useAppSelector, useAppDispatch } from '@/lib/store';
import { playMove, reset, setBoardSize } from '@/lib/store/slices/board.slice';
import { Slider } from '@/components/ui/slider';

export default function Home() {
  const { board, validMoves, current, totalBlack, totalWhite, boardSize } =
    useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <div className="bg-zinc-800 px-10 py-6 rounded-lg shadow-lg">
        <div className="flex flex-row justify-between mb-4 gap-6">
          <div className="flex flex-row items-center gap-3">
            <div className={'w-12 h-12 rounded-full bg-black shadow-inner'} />
            <div className="flex flex-col items-center">
              <p className="text-sm text-zinc-400">Black</p>
              <p className="text-2xl font-bold">{totalBlack}</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3">
            <div className={'w-12 h-12 rounded-full bg-white shadow-inner'} />
            <div className="flex flex-col items-center">
              <p className="text-sm text-zinc-400">White</p>
              <p className="text-2xl font-bold">{totalWhite}</p>
            </div>
          </div>
        </div>

        {validMoves.some((row) => row.some((cell) => cell)) ? (
          <div className="flex items-center justify-center gap-3 bg-zinc-700/50 py-2 px-4 rounded-md">
            <p className="text-sm text-zinc-300">Current turn:</p>
            <div
              className={`w-5 h-5 rounded-full ${
                current === 'B' ? 'bg-black' : 'bg-white'
              } shadow-inner`}
            />
            <p className="font-medium">{current === 'B' ? 'Black' : 'White'}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 bg-zinc-700/50 py-2 px-4 rounded-md">
            <p className="text-sm text-zinc-300">Game Over</p>
            <p className="font-medium">
              {totalBlack > totalWhite
                ? 'Black'
                : totalWhite > totalBlack
                ? 'White'
                : "It's a tie!"}
            </p>
          </div>
        )}

        <div className="w-full max-w-md mx-auto mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-zinc-400">Board Size</label>
            <span className="text-sm font-medium">
              {boardSize}x{boardSize}
            </span>
          </div>
          <Slider
            value={[boardSize]}
            min={4}
            max={12}
            step={2}
            onValueChange={([value]) => dispatch(setBoardSize(value))}
            className="w-full"
          />
        </div>

        <button
          onClick={() => dispatch(reset())}
          className="mt-4 w-full rounded bg-zinc-700 px-3 py-1 cursor-pointer hover:bg-zinc-600 transition-colors"
        >
          Reset Game
        </button>
      </div>

      <div
        className={`grid gap-0.5 w-full max-w-[600px]`}
        style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}
      >
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <div key={`${colIndex}-${rowIndex}`} className="aspect-square">
              <div className="w-full h-full bg-green-700 flex items-center justify-center">
                {validMoves[rowIndex][colIndex] ? (
                  <button
                    onClick={() =>
                      dispatch(playMove({ x: colIndex, y: rowIndex }))
                    }
                    className="w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    <div
                      className={`w-[90%] h-[90%] rounded-full border-2 border-dashed ${
                        current === 'B' ? 'border-black/60' : 'border-white/60'
                      } flex items-center justify-center`}
                    />
                  </button>
                ) : (
                  piece && (
                    <div
                      className={`w-[90%] h-[90%] rounded-full ${
                        piece === 'B' ? 'bg-black' : 'bg-white'
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
