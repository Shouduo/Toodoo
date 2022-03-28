import * as React from 'react';
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
} from '@mui/material';
import NavBar from '@/components/NavBar';
// import icon from '@/../assets/icon.svg';
import '@/renderer/App.css';
import SidePart from '@/layouts/SidePart';
import ResponsiveDateTimePickers from '@/components/ItemCreator';
import ProgressItem from '@/components/ProgressItem';
import { ITEM_TYPES, INITIAL_DATA } from '@/utils/constants';
import ItemList from '@/components/ItemList';
import * as ls from 'local-storage';

//
const reducers = (data, action) => {
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
export const Context = React.createContext({
  data: [],
  dispatch: () => {},
});

//
const IndexPage = () => {
  const [data, dispatch] = React.useReducer(
    reducers,
    JSON.parse(ls.get<string>('Toodoo_data')) || INITIAL_DATA
  );
  // const [data, setData] = React.useState(
  //   JSON.parse(ls.get<string>('Toodoo')) || INITIAL_DATA
  // );
  React.useEffect(() => {
    ls.set<string>('Toodoo_data', JSON.stringify(data));
  }, [data]);
  return (
    <>
      <Context.Provider value={{ data, dispatch }}>
        <NavBar />
        <SidePart
          left={<ResponsiveDateTimePickers />}
          // right={
          //   <ProgressItem
          //     type={ITEM_TYPES.normal}
          //     content="hahahahahhahahahahhaha it's me, scarecrow"
          //     startTime={1648299041357}
          //     duration={3600000}
          //     isDone={false}
          //   />
          // }
          right={<ItemList />}
        />
      </Context.Provider>
    </>
  );
};

export default IndexPage;
