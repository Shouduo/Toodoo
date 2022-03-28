import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Container,
  Typography,
  IconButton,
  ListItem,
} from '@mui/material';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';
import * as colors from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { ITEM_TYPES } from '@/utils/constants';
import { Context } from '@/pages/IndexPage';

//
const ProgressBackground = styled(LinearProgress)(
  ({ theme, bgcolor, isdim }) => ({
    position: 'absolute',
    height: 'auto',
    inset: '0 0 0 0',
    borderRadius: '4px',
    [`&.${linearProgressClasses.colorPrimary}`]: {
      // backgroundColor:
      //   theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
      backgroundColor: bgcolor[isdim ? 100 : 200],
      transition: 'all ease .2s',
    },
    [`& .${linearProgressClasses.bar}`]: {
      // borderRadius: 5,
      backgroundImage:
        'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
      backgroundSize: '32px 32px',
      // backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
      backgroundColor: bgcolor[isdim ? 300 : 500],
      transition: 'all ease .2s',
    },
  })
);

//
const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  ':before': {
    content: "''",
    background: 'white',
    position: 'absolute',
    height: '16px',
    width: '16px',
  },
  '& .PrivateSwitchBase-input': {
    zIndex: 2,
  },
  '& .MuiSvgIcon-root': {
    zIndex: 1,
    // fontSize: '28px',
  },
}));

export interface ProgressItemProps {
  id: string;
  content: string;
  type: string;
  startTime: number;
  finishTime: number | null;
  planDuration: number;
  isDone: boolean;
}
//
const ProgressItem = ({
  id,
  content,
  type,
  startTime,
  finishTime,
  planDuration,
  isDone,
}: ProgressItemProps) => {
  const { data, dispatch } = React.useContext(Context);
  const onCheckChange = ({ target }) => {
    dispatch({ type: 'update', payload: { id, isDone: target.checked } });
    // setisDone(target.checked);
  };

  const onDelete = () => {
    console.log('onDelete');
    dispatch({ type: 'delete', payload: { id } });
  };

  React.useEffect(() => {
    let timer;
    if (!isDone && !timer) {
      timer = setInterval(() => {}, 1000);
    }
  }, [isDone]);

  return (
    <Box
      id={id}
      sx={{
        position: 'relative',
        height: '48px',
        width: '100%',
        overflow: 'hidden',
        margin: '8px 0',
      }}
    >
      <ProgressBackground
        variant="determinate"
        value={70}
        bgcolor={ITEM_TYPES[type].color}
        isdim={isDone}
      />
      <Stack direction="row" alignItems="center" height="100%">
        <StyledCheckbox
          inputProps={{ 'aria-label': 'Checkbox demo' }}
          sx={{ color: `${ITEM_TYPES[type].color[500]} !important` }}
          checked={isDone}
          onChange={onCheckChange}
        />
        <Typography
          variant="body1"
          noWrap
          component="div"
          title="Is this the real life, is this just fantasy?"
          sx={{
            flexGrow: 1,
            zIndex: 1,
            color: 'white',
            textDecoration: isDone ? 'line-through' : 'none',
            textShadow: '1px 1px 1px rgba(0, 0, 0, 30%)',
          }}
        >
          {content}
        </Typography>
        <Stack
          direction="column"
          alignItems="end"
          alignSelf="start"
          height="200%"
          sx={{
            mr: 1,
            transition: 'all ease .2s',
            '&:hover': {
              transform: 'translateY(-50%)',
            },
          }}
        >
          <Stack height="50%" justifyContent="center" alignItems="center">
            <Typography
              variant="body1"
              noWrap
              component="div"
              sx={{
                zIndex: 1,
                color: 'white',
                textShadow: '1px 1px 1px rgba(0, 0, 0, 30%)',
              }}
            >
              120:00 left
            </Typography>
          </Stack>
          <Stack height="50%" justifyContent="center" alignItems="center">
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ color: 'white' }}
              onClick={onDelete}
            >
              <CloseIcon
                fontSize="inherit"
                sx={{
                  filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 30%))',
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProgressItem;
