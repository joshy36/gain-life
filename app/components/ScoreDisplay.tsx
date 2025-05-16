interface ScoreDisplayProps {
  totalBlack: number;
  totalWhite: number;
  blackLabel: string;
  whiteLabel: string;
}

export function ScoreDisplay({
  totalBlack,
  totalWhite,
  blackLabel,
  whiteLabel,
}: ScoreDisplayProps) {
  return (
    <div className="flex flex-row justify-between mb-4 gap-6">
      <div className="flex flex-row items-center gap-3">
        <div className={'w-12 h-12 rounded-full bg-black shadow-inner'} />
        <div className="flex flex-col items-center">
          <p className="text-sm text-zinc-400">{blackLabel}</p>
          <p className="text-2xl font-bold">{totalBlack}</p>
        </div>
      </div>

      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col items-center">
          <p className="text-sm text-zinc-400">{whiteLabel}</p>
          <p className="text-2xl font-bold">{totalWhite}</p>
        </div>
        <div className={'w-12 h-12 rounded-full bg-white shadow-inner'} />
      </div>
    </div>
  );
}
