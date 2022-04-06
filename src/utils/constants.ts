import { nanoid } from 'nanoid';
//
type ItemLevelType = {
  label: string;
  color: string;
  key: string;
  level: number;
};
//
export const ITEM_LEVELS: { [key: string]: ItemLevelType } = {
  normal: { label: 'Normal', color: 'success', key: 'normal', level: 0 },
  major: { label: 'Major', color: 'warning', key: 'major', level: 1 },
  deadly: { label: 'Deadly', color: 'error', key: 'deadly', level: 2 },
};
//
export const DEFAULT_DURATION = 45 * 60 * 1000;
//
export type ItemType = {
  id: string;
  content: string;
  level: string;
  startTime: number;
  endTime: number;
  finishTime: number | null;
  isDone: boolean;
};
//
export const ITEM_TEMPLATE = {
  id: nanoid(),
  content: 'Hello World',
  level: ITEM_LEVELS.normal.key,
  startTime: Date.now(),
  endTime: Date.now() + DEFAULT_DURATION,
  finishTime: null,
  isDone: false,
};
//
export const INITIAL_DATA = [
  {
    id: nanoid(),
    content: 'This is a easy use todo list',
    level: ITEM_LEVELS.normal.key,
    startTime: Date.now(),
    endTime: Date.now() + 45 * 60 * 1000,
    finishTime: null,
    isDone: false,
  },
  {
    id: nanoid(),
    content: 'Just add tasks and set deadline',
    level: ITEM_LEVELS.major.key,
    startTime: Date.now(),
    endTime: Date.now() + 60 * 60 * 1000,
    finishTime: null,
    isDone: false,
  },
  {
    id: nanoid(),
    content: 'Then move your butt and beat the clock',
    level: ITEM_LEVELS.deadly.key,
    startTime: Date.now(),
    endTime: Date.now() + 75 * 60 * 1000,
    finishTime: null,
    isDone: false,
  },
];
