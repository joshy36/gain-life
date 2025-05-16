import { useAppDispatch } from '@/lib/store';
import { reset, setBoardSize } from '@/lib/store/slices/board.slice';
import { Slider } from '@/app/components/ui/slider';

interface GameControlsProps {
  boardSize: number;
  onBoardSizeChange: (size: number) => void;
  onReset: () => void;
}

export function GameControls({
  boardSize,
  onBoardSizeChange,
  onReset,
}: GameControlsProps) {
  return (
    <>
      <div className="w-full mt-4">
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
          onValueChange={([value]) => onBoardSizeChange(value)}
          className="w-full"
        />
      </div>

      <button
        onClick={onReset}
        className="mt-4 w-full rounded bg-zinc-700 px-3 py-1 cursor-pointer hover:bg-zinc-600 transition-colors"
      >
        Reset Game
      </button>
    </>
  );
}
