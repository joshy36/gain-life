import { Current } from '@/lib/store/slices/boardSlice';

export const playerPieceColors: Record<Current, string> = {
  B: 'bg-black',
  W: 'bg-white',
  R: 'bg-red-500',
  G: 'bg-green-500',
  BL: 'bg-blue-500',
  Y: 'bg-yellow-500',
  O: 'bg-orange-500',
  P: 'bg-purple-500',
};

export const playerBorderColors: Record<Current, string> = {
  B: 'border-black',
  W: 'border-white',
  R: 'border-red-500',
  G: 'border-green-500',
  BL: 'border-blue-500',
  Y: 'border-yellow-500',
  O: 'border-orange-500',
  P: 'border-purple-500',
};

export const colorMapping: Record<Current, string> = {
  B: 'Black',
  W: 'White',
  R: 'Red',
  G: 'Green',
  BL: 'Blue',
  Y: 'Yellow',
  O: 'Orange',
  P: 'Purple',
};
