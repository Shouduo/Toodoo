import * as React from 'react';
import NavBar from '@/components/NavBar';
// import icon from '@/../assets/icon.svg';
import '@/renderer/App.css';
import SidePart from '@/layouts/SidePart';
import ItemCreator from '@/components/ItemCreator';
import { INITIAL_DATA } from '@/utils/constants';
import ItemList from '@/components/ItemList';
import * as ls from 'local-storage';
import Accordion from '@/layouts/Accordion';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Context, reducers } from '@/context/index';

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
