import * as colors from '@mui/material/colors';
import { nanoid } from 'nanoid';

export const ITEM_TYPES = {
  normal: { label: 'Normal', color: colors.green, key: 'normal' },
  major: { label: 'Major', color: colors.orange, key: 'major' },
  deadly: { label: 'Deadly', color: colors.red, key: 'deadly' },
};

export const INITIAL_DATA = [
  {
    id: nanoid(),
    content: 'This is a easy use todo list',
    type: ITEM_TYPES.normal.key,
    startTime: Date.now(),
    finishTime: null,
    planDuration: 3600000,
    isDone: false,
  },
  {
    id: nanoid(),
    content: 'Just add tasks and set deadline',
    type: ITEM_TYPES.major.key,
    startTime: Date.now() + 3600000,
    finishTime: null,
    planDuration: 3600000,
    isDone: false,
  },
  {
    id: nanoid(),
    content: 'Then move your butt and beat the clock',
    type: ITEM_TYPES.deadly.key,
    startTime: Date.now() + 7200000,
    finishTime: null,
    planDuration: 3600000,
    isDone: false,
  },
];

export const DEFAULT_DURATION = 45 * 60 * 1000;
