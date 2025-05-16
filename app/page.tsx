'use client';

import { useAppSelector, useAppDispatch } from '@/lib/store';
import {
  reset,
  setBoardSize,
  setNumberOfPlayers,
  Current,
} from '@/lib/store/slices/boardSlice';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/app/components/ui/tabs';
import { Users, Bot } from 'lucide-react';
import { useState } from 'react';
import { Board } from '@/app/components/Board';
import { GameControls } from '@/app/components/GameControls';
import { ScoreDisplay } from '@/app/components/ScoreDisplay';
import { GameStatus } from '@/app/components/GameStatus';
import { useAIMove } from '@/app/hooks/useAIMove';
import { colorMapping } from './utils/colors';

export default function Home() {
  const {
    validMoves,
    current,
    scores,
    board,
    boardSize,
    players,
    numberOfPlayers,
  } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const [gameMode, setGameMode] = useState<'local' | 'ai'>('local');
  const { isAILoading } = useAIMove(gameMode);

  const hasValidMoves = validMoves.some((row) => row.some((cell) => cell));

  const handleBoardSizeChange = (size: number) => {
    dispatch(setBoardSize(size));
    if (size <= 6 && numberOfPlayers > 2) {
      dispatch(setNumberOfPlayers(2));
    }
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleNumberOfPlayersChange = (numPlayers: number) => {
    dispatch(setNumberOfPlayers(numPlayers));
  };

  let orderedPlayersForDisplay: Current[];
  let playerDisplayNames: Partial<Record<Current, string>>;

  if (gameMode === 'local') {
    orderedPlayersForDisplay = players.slice(0, numberOfPlayers);
    playerDisplayNames = {};
    orderedPlayersForDisplay.forEach((p) => {
      playerDisplayNames[p] = colorMapping[p] || p;
    });
  } else {
    orderedPlayersForDisplay = ['B', 'W'];
    playerDisplayNames = { B: 'You', W: 'AI' };
  }

  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <div className="bg-zinc-800 border border-zinc-700 px-10 py-6 rounded-lg shadow-lg w-full max-w-[600px]">
        <Tabs
          defaultValue="local"
          className="w-full"
          onValueChange={(value) => {
            const newGameMode = value as 'local' | 'ai';
            setGameMode(newGameMode);
            if (newGameMode === 'ai') {
              dispatch(setNumberOfPlayers(2));
            }
            dispatch(reset());
          }}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="local"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Users className="h-4 w-4" />
              Local Play
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Bot className="h-4 w-4" />
              Play vs AI
            </TabsTrigger>
          </TabsList>
          <TabsContent value="local">
            <ScoreDisplay
              scores={scores}
              orderedPlayers={orderedPlayersForDisplay}
              playerDisplayNames={playerDisplayNames}
            />
            <GameStatus
              current={current}
              isAILoading={isAILoading}
              gameMode={gameMode}
              scores={scores}
              orderedPlayers={orderedPlayersForDisplay}
              hasValidMoves={hasValidMoves}
              playerDisplayNames={playerDisplayNames}
            />
            <GameControls
              boardSize={boardSize}
              onBoardSizeChange={handleBoardSizeChange}
              onReset={handleReset}
              numberOfPlayers={numberOfPlayers}
              onNumberOfPlayersChange={handleNumberOfPlayersChange}
              gameMode="local"
            />
          </TabsContent>
          <TabsContent value="ai">
            <ScoreDisplay
              scores={scores}
              orderedPlayers={orderedPlayersForDisplay}
              playerDisplayNames={playerDisplayNames}
            />
            <GameStatus
              current={current}
              isAILoading={isAILoading}
              gameMode={gameMode}
              scores={scores}
              orderedPlayers={orderedPlayersForDisplay}
              hasValidMoves={hasValidMoves}
              playerDisplayNames={playerDisplayNames}
            />
            <GameControls
              boardSize={boardSize}
              onBoardSizeChange={handleBoardSizeChange}
              onReset={handleReset}
              numberOfPlayers={2}
              onNumberOfPlayersChange={() => {}}
              gameMode="ai"
            />
          </TabsContent>
        </Tabs>
      </div>

      <Board
        gameMode={gameMode}
        current={current}
        isAILoading={isAILoading}
        board={board}
        validMoves={validMoves}
        boardSize={boardSize}
      />
    </main>
  );
}
