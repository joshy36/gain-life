import { Current } from '@/lib/store/slices/boardSlice';
import { playerPieceColors } from '../utils/colors';

interface ScoreDisplayProps {
  scores: Record<Current, number>;
  orderedPlayers: Current[];
  playerDisplayNames: Partial<Record<Current, string>>;
}

export function ScoreDisplay({
  scores,
  orderedPlayers,
  playerDisplayNames,
}: ScoreDisplayProps) {
  // Filter out players not in playerDisplayNames to prevent errors if data is inconsistent
  const playersToRender = orderedPlayers.filter(
    (p) => playerDisplayNames[p] && scores.hasOwnProperty(p)
  );

  return (
    <div className="flex flex-row justify-around mb-4 gap-x-4 gap-y-2 flex-wrap">
      {playersToRender.map((playerPiece) => (
        <div
          key={playerPiece}
          className="flex flex-row items-center gap-3 p-1 min-w-[100px]"
        >
          <div
            className={`w-10 h-10 rounded-full ${
              playerPieceColors[playerPiece] || 'bg-gray-300'
            } shadow-inner border border-zinc-600`}
          />
          <div className="flex flex-col items-start">
            <p className="text-sm text-zinc-400">
              {playerDisplayNames[playerPiece] || playerPiece}
            </p>
            <p className="text-2xl font-bold">{scores[playerPiece] ?? 0}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
