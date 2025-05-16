import { anthropic } from '@ai-sdk/anthropic';
import { generateObject } from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const moveSchema = z.object({
  recommendedMove: z.object({
    x: z.number().describe('X coordinate of the recommended move (0-based)'),
    y: z.number().describe('Y coordinate of the recommended move (0-based)'),
  }),
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const { object } = await generateObject({
      model: anthropic('claude-3-7-sonnet-20250219'),
      system: `You are an expert Othello/Reversi player. Your task is to suggest the best move for the current board position.
When choosing a move:
1. Consider the current board state, score, and whose turn it is
2. Look for moves that maximize piece flips while maintaining good board control
3. Prioritize corner and edge positions as they are strategically valuable
4. Consider mobility - moves that give you more options in future turns
5. Be precise with your move coordinates (x,y)
6. IMPORTANT: Only suggest moves that are valid according to the game rules. A move is valid if it would flip at least one opponent's piece.`,
      prompt,
      schema: moveSchema,
    });

    return NextResponse.json({ response: object });
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
