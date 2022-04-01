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
import ItemCreator from '@/components/ItemCreator';
import ProgressItem from '@/components/ProgressItem';
import { ITEM_LEVELS, INITIAL_DATA, ItemType } from '@/utils/constants';
import ItemList from '@/components/ItemList';
import * as ls from 'local-storage';
import Accordion from '@/layouts/Accordion';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type ActionType = {
  type: string;
  payload: ItemType;
};

//
const reducers = (data: ItemType[], action: ActionType): ItemType[] => {
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
}>({
  data: [],
  dispatch: () => {},
});

//
const IndexPage = () => {
  const [data, dispatch] = React.useReducer(
    reducers,
    JSON.parse(ls.get<string>('Toodoo_data')) || INITIAL_DATA
  );

  const theme = useTheme();
  const isLargeView = useMediaQuery(theme.breakpoints.up('sm'));
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
          // left={<ItemCreator />}
          left={
            <Accordion
              summary="Add todo"
              detail={<ItemCreator />}
              disabled={isLargeView}
            />
          }
          // left={
          //   <Accordion>
          //     <ItemCreator />
          //   </Accordion>
          // }
          // right={
          //   <ProgressItem
          //     type={ITEM_LEVELS.normal}
          //     content="hahahahahhahahahahhaha it's me, scarecrow"
          //     startTime={1648299041357}
          //     duration={3600000}
          //     isDone={false}
          //   />
          // }
          right={<ItemList />}
          // right={
          //   <Box sx={{ border: '1px solid green' }}>
          //     <Box id="pink" sx={{ background: 'pink' }}>
          //       heh
          //     </Box>
          //     <Box id="blue" sx={{ background: 'lightblue' }}>
          //       hoho
          //     </Box>
          //   </Box>
          // }
        />
      </Context.Provider>
    </>
  );
};

export default IndexPage;
