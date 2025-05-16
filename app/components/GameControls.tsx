import { Slider } from '@/app/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';

interface GameControlsProps {
  boardSize: number;
  onBoardSizeChange: (size: number) => void;
  onReset: () => void;
  numberOfPlayers: number;
  onNumberOfPlayersChange: (players: number) => void;
  gameMode: 'local' | 'ai';
}

export function GameControls({
  boardSize,
  onBoardSizeChange,
  onReset,
  numberOfPlayers,
  onNumberOfPlayersChange,
  gameMode,
}: GameControlsProps) {
  return (
    <>
      {gameMode === 'local' && (
        <div className="w-full mt-4">
          <label className="text-sm text-zinc-400 mb-2 block">
            Number of Players
          </label>
          <RadioGroup
            value={String(numberOfPlayers)}
            onValueChange={(value: string) =>
              onNumberOfPlayersChange(Number(value))
            }
            className="flex space-x-4"
          >
            {[2, 4, 6, 8].map((num) => {
              const isDisabled = boardSize <= 6 && num > 2;
              return (
                <div key={num} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={String(num)}
                    id={`players-${num}`}
                    disabled={isDisabled}
                  />
                  <Label
                    htmlFor={`players-${num}`}
                    className={`text-sm font-medium ${
                      isDisabled
                        ? 'text-zinc-500 cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                  >
                    {num}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      )}

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
