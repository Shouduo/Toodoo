import * as colors from '@mui/material/colors';
import { nanoid } from 'nanoid';

export const ITEM_LEVELS = {
  normal: { label: 'Normal', color: colors.green, key: 'normal' },
  major: { label: 'Major', color: colors.orange, key: 'major' },
  deadly: { label: 'Deadly', color: colors.red, key: 'deadly' },
};

export type ItemType = {
  id: string;
  content: string;
  type: string;
  startTime: number;
  finishTime: number | null;
  planDuration: number;
  isDone: boolean;
};

export const ITEM_TEMPLATE = {
  id: nanoid(),
  content: 'Hello World',
  type: ITEM_LEVELS.normal.key,
  startTime: Date.now(),
  finishTime: null,
  planDuration: 45 * 60 * 1000,
  isDone: false,
};

export const INITIAL_DATA = [
  {
    id: nanoid(),
    content: 'This is a easy use todo list',
    type: ITEM_LEVELS.normal.key,
    startTime: Date.now(),
    finishTime: null,
    planDuration: 3600000,
    isDone: false,
  },
  {
    id: nanoid(),
    content: 'Just add tasks and set deadline',
    type: ITEM_LEVELS.major.key,
    startTime: Date.now() + 3600000,
    finishTime: null,
    planDuration: 3600000,
    isDone: false,
  },
  {
    id: nanoid(),
    content: 'Then move your butt and beat the clock',
    type: ITEM_LEVELS.deadly.key,
    startTime: Date.now() + 7200000,
    finishTime: null,
    planDuration: 3600000,
    isDone: false,
  },
];

export const DEFAULT_DURATION = 45 * 60 * 1000;
