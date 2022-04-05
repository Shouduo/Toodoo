import * as React from 'react';
import { ItemType } from '@/utils/constants';

export interface ActionType {
  type: string;
  payload: ItemType;
}

//
export const reducers = (data: ItemType[], action: ActionType): ItemType[] => {
  switch (action.type) {
    case 'add':
      return [...data, action.payload];
    case 'delete':
      return data.filter((item) => item.id !== action.payload.id);
    case 'update':
      return data.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    default:
      throw new Error('action type not found');
  }
};

//
export const Context = React.createContext<{
  data: ItemType[];
  dispatch: (action: ActionType) => void;
  order: string;
  setOrder: (order: string) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}>({
  data: [],
  dispatch: () => {},
  order: '',
  setOrder: () => {},
  keyword: '',
  setKeyword: () => {},
});
