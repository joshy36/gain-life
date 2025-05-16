'use client';

import { useAppSelector, useAppDispatch } from '@/lib/store';
import { reset, setBoardSize } from '@/lib/store/slices/board.slice';
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

export default function Home() {
  const { validMoves, current, totalBlack, totalWhite, board, boardSize } =
    useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const [gameMode, setGameMode] = useState<'local' | 'ai'>('local');
  const { isAILoading } = useAIMove(gameMode);

  const hasValidMoves = validMoves.some((row) => row.some((cell) => cell));

  const handleBoardSizeChange = (size: number) => {
    dispatch(setBoardSize(size));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <div className="bg-zinc-800 border border-zinc-700 px-10 py-6 rounded-lg shadow-lg w-full max-w-[600px]">
        <Tabs
          defaultValue="local"
          className="w-full"
          onValueChange={(value) => {
            setGameMode(value as 'local' | 'ai');
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
              totalBlack={totalBlack}
              totalWhite={totalWhite}
              blackLabel="Black"
              whiteLabel="White"
            />
            <GameStatus
              current={current}
              isAILoading={isAILoading}
              gameMode={gameMode}
              totalBlack={totalBlack}
              totalWhite={totalWhite}
              hasValidMoves={hasValidMoves}
            />
            <GameControls
              boardSize={boardSize}
              onBoardSizeChange={handleBoardSizeChange}
              onReset={handleReset}
            />
          </TabsContent>
          <TabsContent value="ai">
            <ScoreDisplay
              totalBlack={totalBlack}
              totalWhite={totalWhite}
              blackLabel="You"
              whiteLabel="AI"
            />
            <GameStatus
              current={current}
              isAILoading={isAILoading}
              gameMode={gameMode}
              totalBlack={totalBlack}
              totalWhite={totalWhite}
              hasValidMoves={hasValidMoves}
            />
            <GameControls
              boardSize={boardSize}
              onBoardSizeChange={handleBoardSizeChange}
              onReset={handleReset}
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
