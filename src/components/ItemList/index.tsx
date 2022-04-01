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
import {
  orderBy,
  groupBy,
  filter,
  map,
  reduce,
  isString,
  includes,
} from 'lodash';
import { nanoid } from 'nanoid';

//
const ItemGroup = ({ group, length, onClick }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: '48px',
        width: '100%',
        margin: '4px 0',
        background: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all ease .2s',
        '&:hover': { background: 'rgba(0,0,0,0.05)' },
      }}
      onClick={onClick}
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
  const [expandGroup, setExpandGroup] = React.useState(['Ongoing', 'Done']);

  const onExpandToggle = (group) => () => {
    if (expandGroup.includes(group)) {
      setExpandGroup(filter(expandGroup, (g) => g !== group));
    } else {
      setExpandGroup([...expandGroup, group]);
    }
  };

  React.useEffect(() => {
    const orderedData = orderBy(data, ['startTime'], ['asc']);
    const ongoingData = filter(orderedData, ['isDone', false]);
    const doneData = filter(orderedData, ['isDone', true]);
    const shownData = [
      { group: 'Ongoing', length: ongoingData.length },
      ...(expandGroup.includes('Ongoing') ? ongoingData : []),
      { group: 'Done', length: doneData.length },
      ...(expandGroup.includes('Done') ? doneData : []),
    ];
    setSortedData(shownData);
  }, [data, expandGroup]);
  return (
    <>
      <FlipMove
        typeName="ul"
        duration={200}
        // staggerDurationBy={50}
        // staggerDelayBy={10}
        enterAnimation="fade"
        leaveAnimation="fade"
      >
        {sortedData.map((item) =>
          item.group ? (
            <ListItem key={item.group} sx={{ padding: '0' }}>
              <ItemGroup {...item} onClick={onExpandToggle(item.group)} />
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
