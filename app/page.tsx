'use client';

import { useAppSelector, useAppDispatch, RootState } from '@/lib/store';
import { playMove, reset } from '@/lib/store/slices/board.slice';

export default function Home() {
  const board = useAppSelector((state: RootState) => state.board.board);
  const validMoves = useAppSelector(
    (state: RootState) => state.board.validMoves
  );
  const current = useAppSelector((state: RootState) => state.board.current);
  const dispatch = useAppDispatch();

  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <div className="bg-zinc-800 px-10 py-6 rounded-lg shadow-lg">
        <div className="flex flex-row justify-between mb-4 gap-6">
          <div className="flex flex-row items-center gap-3">
            <div className={'w-12 h-12 rounded-full bg-black shadow-inner'} />
            <div className="flex flex-col items-center">
              <p className="text-sm text-zinc-400">Black</p>
              <p className="text-2xl font-bold">10</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3">
            <div className={'w-12 h-12 rounded-full bg-white shadow-inner'} />
            <div className="flex flex-col items-center">
              <p className="text-sm text-zinc-400">White</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 bg-zinc-700/50 py-2 px-4 rounded-md">
          <p className="text-sm text-zinc-300">Current turn:</p>
          <div
            className={`w-5 h-5 rounded-full ${
              current === 'B' ? 'bg-black' : 'bg-white'
            } shadow-inner`}
          />
          <p className="font-medium">{current === 'B' ? 'Black' : 'White'}</p>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-0.5">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <div key={`${colIndex}-${rowIndex}`}>
              <div className="w-16 h-16 bg-green-700 flex items-center justify-center">
                {validMoves[rowIndex][colIndex] ? (
                  <button
                    onClick={() =>
                      dispatch(playMove({ x: colIndex, y: rowIndex }))
                    }
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div
                      className={`w-14 h-14 rounded-full border-2 border-dashed ${
                        current === 'B' ? 'border-black/60' : 'border-white/60'
                      } flex items-center justify-center`}
                    />
                  </button>
                ) : (
                  piece && (
                    <div
                      className={`w-14 h-14 rounded-full ${
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

      <button
        onClick={() => dispatch(reset())}
        className="mt-4 rounded bg-zinc-700 px-3 py-1 cursor-pointer"
      >
        Reset
      </button>
    </main>
  );
}
