import { useAppDispatch } from '@/lib/store';
import { Current, Piece, playMove } from '@/lib/store/slices/board.slice';

interface BoardProps {
  gameMode: 'local' | 'ai';
  current: Current;
  isAILoading: boolean;
  board: Piece[][];
  validMoves: boolean[][];
  boardSize: number;
}

export function Board({
  gameMode,
  current,
  isAILoading,
  board,
  validMoves,
  boardSize,
}: BoardProps) {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`grid gap-0.5 w-full max-w-[600px]`}
      style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}
    >
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div key={`${colIndex}-${rowIndex}`} className="aspect-square">
            <div className="w-full h-full bg-green-700 flex items-center justify-center">
              {validMoves[rowIndex][colIndex] &&
              !(gameMode === 'ai' && current === 'W') &&
              !isAILoading ? (
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
  );
}
