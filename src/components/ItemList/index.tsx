import * as React from 'react';
import { Box, Stack, Typography, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
// import { TransitionGroup } from 'react-transition-group';
import FlipMove from 'react-flip-move';
import { shuffle } from '@/utils/public';
import ProgressItem from '@/components/ProgressItem';
import { Context } from '@/pages/IndexPage';
import { orderBy, groupBy, filter, map, reduce, isString } from 'lodash';
import { nanoid } from 'nanoid';

//
const ItemGroup = ({ group, length }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: '48px', width: '100%' }}
    >
      <Typography variant="h6" noWrap component="div">
        {group}
      </Typography>
      <Chip label={length} />
    </Stack>
  );
};

//
const ItemList = () => {
  const { data, dispatch } = React.useContext(Context);
  const [sortedData, setSortedData] = React.useState([]);

  React.useEffect(() => {
    const groupOrder = ['Ongoing', 'Done'];
    const orderedData = orderBy(data, ['startTime'], ['asc']);
    const ongoingData = filter(orderedData, ['isDone', false]);
    const doneData = filter(orderedData, ['isDone', true]);
    const shownData = [
      { group: 'Ongoing', length: ongoingData.length },
      ...ongoingData,
      { group: 'Done', length: doneData.length },
      ...doneData,
    ];
    setSortedData(shownData);
  }, [data]);
  return (
    <>
      <Button
        onClick={() =>
          dispatch({
            type: 'add',
            payload: {
              id: nanoid(),
              content: Date().toString(),
              type: 'normal',
              startTime: Date.now(),
              finishTime: null,
              planDuration: 3600000,
              isDone: false,
            },
          })
        }
      >
        add
      </Button>
      <FlipMove
        typeName="ul"
        duration={200}
        staggerDurationBy={50}
        staggerDelayBy={10}
        enterAnimation="fade"
        leaveAnimation="fade"
      >
        {sortedData.map((item) =>
          item.group ? (
            <ListItem key={item.group} sx={{ padding: '0' }}>
              <ItemGroup {...item} />
            </ListItem>
          ) : (
            <ListItem key={item.id} sx={{ padding: '0' }}>
              <ProgressItem {...item} />
            </ListItem>
          )
        )}
      </FlipMove>
    </>
  );
};

export default ItemList;
