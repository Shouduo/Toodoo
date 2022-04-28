import * as React from 'react';
import '@/renderer/App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import * as ls from 'local-storage';
import { INITIAL_DATA } from '@/utils/constants';
import Accordion from '@/layouts/Accordion';
import { Context, reducers } from '@/context/index';
import ItemList from '@/components/ItemList';
import ItemCreator from '@/components/ItemCreator';
import NavBar from '@/components/NavBar';
import SidePart from '@/layouts/SidePart';

//
const IndexPage = () => {
  const [data, dispatch] = React.useReducer(
    reducers,
    JSON.parse(ls.get<string>('Toodoo_data')) || INITIAL_DATA
  );
  const [order, setOrder] = React.useState<string>(
    ls.get<string>('Toodoo_order') || 'All'
  );
  const [keyword, setKeyword] = React.useState<string>('');

  const theme = useTheme();
  const isLargeView = useMediaQuery(theme.breakpoints.up('sm'));

  React.useEffect(() => {
    ls.set<string>('Toodoo_data', JSON.stringify(data));
  }, [data]);

  React.useEffect(() => {
    ls.set<string>('Toodoo_order', order);
  }, [order]);
  return (
    <>
      <Context.Provider
        value={{ data, dispatch, order, setOrder, keyword, setKeyword }}
      >
        <NavBar />
        <SidePart
          left={
            <Accordion
              summary="Add todo"
              detail={<ItemCreator />}
              disabled={isLargeView}
            />
          }
          right={<ItemList />}
        />
      </Context.Provider>
    </>
  );
};

export default IndexPage;
