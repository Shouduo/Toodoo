import * as React from 'react';
import { Stack, Typography, Chip, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { orderBy, filter } from 'lodash';
import FlipMove from 'react-flip-move';
import ProgressItem from '@/components/ProgressItem';
import { Context } from '@/context/index';
import { ItemType, ITEM_LEVELS, ITEM_TEMPLATE } from '@/utils/constants';

//
const ItemGroup = ({
  id,
  content,
  onClick,
}: {
  id: string;
  content: string;
  onClick: () => void;
}) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: '48px',
        width: '100%',
        margin: '4px 0',
        bgcolor: 'background.default',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'filter ease .2s',
        '&:hover': { filter: 'invert(0.1)' },
      }}
      onClick={onClick}
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        color={theme.palette.text.primary}
      >
        {id}
      </Typography>
      <Chip label={content} />
    </Stack>
  );
};

//
const ItemList = () => {
  const { data, order, keyword } = React.useContext(Context);
  const [sortedData, setSortedData] = React.useState<ItemType[]>([]);
  const [expandGroup, setExpandGroup] = React.useState(['Ongoing', 'Done']);

  const onExpandToggle = (id: string) => () => {
    if (expandGroup.includes(id)) {
      setExpandGroup(filter(expandGroup, (g) => g !== id));
    } else {
      setExpandGroup([...expandGroup, id]);
    }
  };

  React.useEffect(() => {
    let orderedData;
    if (order === 'Time left') {
      orderedData = orderBy(data, ['endTime'], ['asc']);
    } else if (order === 'Emergency') {
      orderedData = orderBy(data, (item) => ITEM_LEVELS[item.level].level, [
        'desc',
      ]);
    } else {
      orderedData = orderBy(data, ['startTime'], ['asc']);
    }
    if (keyword.trim() !== '') {
      orderedData = filter(orderedData, (item) =>
        new RegExp(`${keyword.trim()}`, 'ig').test(item.content)
      );
    }
    const ongoingData = filter(orderedData, ['isDone', false]);
    const doneData = filter(orderedData, ['isDone', true]);
    const shownData = [
      { ...ITEM_TEMPLATE, id: 'Ongoing', content: `${ongoingData.length}` },
      ...(expandGroup.includes('Ongoing') ? ongoingData : []),
      { ...ITEM_TEMPLATE, id: 'Done', content: `${doneData.length}` },
      ...(expandGroup.includes('Done') ? doneData : []),
    ];
    setSortedData(shownData);
  }, [data, expandGroup, order, keyword]);

  return (
    <FlipMove
      typeName="ul"
      duration={200}
      // staggerDurationBy={50}
      // staggerDelayBy={10}
      enterAnimation="fade"
      leaveAnimation="fade"
    >
      {sortedData.map((item) =>
        ['Ongoing', 'Done'].includes(item.id) ? (
          <ListItem key={item.id} sx={{ padding: '0' }}>
            <ItemGroup
              id={item.id}
              content={item.content}
              onClick={onExpandToggle(item.id)}
            />
          </ListItem>
        ) : (
          <ListItem key={item.id} sx={{ padding: '0' }}>
            <ProgressItem data={item} />
          </ListItem>
        )
      )}
    </FlipMove>
  );
};

export default ItemList;
