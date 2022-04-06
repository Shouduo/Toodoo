import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  PaletteColor,
  Palette,
} from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import { ITEM_LEVELS, ItemType } from '@/utils/constants';
import { Context } from '@/context/index';
import { durationParser } from '@/utils/public';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@/layouts/Modal';
import ItemCreator from '@/components/ItemCreator';

//
const ProgressBackground = ({
  colorSet,
  isDim,
  ...rest
}: {
  colorSet: PaletteColor;
  isDim: boolean;
} & LinearProgressProps) => (
  <LinearProgress
    sx={{
      position: 'absolute',
      height: 'auto',
      inset: '0 0 0 0',
      opacity: isDim ? '0.5' : '1',
      [`&.${linearProgressClasses.colorPrimary}`]: {
        // backgroundColor: colorSet[isDim ? 100 : 200],
        backgroundColor: colorSet.light,
        transition: 'all ease .2s',
      },
      [`& .${linearProgressClasses.bar}`]: {
        backgroundImage:
          'linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)',
        backgroundSize: '32px 32px',
        // backgroundColor: colorSet[isDim ? 300 : 500],
        backgroundColor: colorSet.main,
        transition: 'all ease .2s',
      },
    }}
    {...rest}
  />
);

//
const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  ':before': {
    content: "''",
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    height: '16px',
    width: '16px',
  },
  '& .PrivateSwitchBase-input': {
    zIndex: 2,
  },
  '& .MuiSvgIcon-root': {
    zIndex: 1,
  },
}));

//
const ProgressItem = ({ data }: { data: ItemType }) => {
  const { dispatch } = React.useContext(Context);
  const theme = useTheme();

  const [leftTime, setLeftTime] = React.useState(0);
  const [percent, setPercent] = React.useState(0);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<number>();
  //
  const onCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'update',
      payload: {
        ...data,
        isDone: e.currentTarget.checked,
        finishTime: e.currentTarget.checked ? Date.now() : null,
      },
    });
  };
  //
  const onDelete = () => {
    dispatch({ type: 'delete', payload: data });
  };
  //
  const calcDuration = React.useCallback(() => {
    const diffTime = (data.finishTime ?? Date.now()) - data.startTime;
    setLeftTime(data.endTime - data.startTime - diffTime);
    setPercent(
      Math.min((diffTime / (data.endTime - data.startTime)) * 100, 100)
    );
  }, [data]);

  React.useEffect(() => {
    calcDuration();
    if (!data.isDone && !timer.current) {
      timer.current = window.setInterval(calcDuration, 1000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [data.isDone, calcDuration]);

  return (
    <>
      <Box
        id={data.id}
        sx={{
          position: 'relative',
          height: '48px',
          width: '100%',
          overflow: 'hidden',
          margin: '4px 0',
          borderRadius: '4px',
        }}
      >
        <ProgressBackground
          variant="determinate"
          value={percent}
          colorSet={
            theme.palette[
              ITEM_LEVELS[data.level].color as keyof Palette
            ] as PaletteColor
          }
          isDim={data.isDone}
        />
        <Stack direction="row" alignItems="center" height="100%">
          <StyledCheckbox
            inputProps={{ 'aria-label': 'Checkbox demo' }}
            // sx={{ color: `${ITEM_LEVELS[data.level].color[500]} !important` }}
            sx={{
              color: `${
                (
                  theme.palette[
                    ITEM_LEVELS[data.level].color as keyof Palette
                  ] as PaletteColor
                ).dark
              } !important`,
            }}
            checked={data.isDone}
            onChange={onCheckChange}
          />
          <Typography
            variant="body1"
            noWrap
            component="div"
            title={data.content}
            sx={{
              flex: 1,
              zIndex: 1,
              mr: 2,
              color: 'white',
              textDecoration: data.isDone ? 'line-through' : 'none',
              textShadow: '1px 1px 1px rgba(0, 0, 0, 30%)',
            }}
          >
            {data.content}
          </Typography>
          <Box height="100%" overflow="hidden" ref={containerRef}>
            <Stack
              direction="column"
              alignItems="end"
              alignSelf="start"
              height="200%"
              sx={{
                mr: 2,
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
                  {leftTime > data.endTime - data.startTime
                    ? `${durationParser(
                        Math.abs(leftTime - (data.endTime - data.startTime))
                      )} away`
                    : `${durationParser(Math.abs(leftTime))} ${
                        leftTime > 0 ? 'left' : 'late'
                      }`}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                height="50%"
              >
                <Tooltip title="edit" arrow>
                  <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    tabIndex={-1}
                    onFocus={() => containerRef.current?.scroll(0, 0)}
                    sx={{ color: 'white' }}
                    onClick={() => setShowEditModal(true)}
                  >
                    <EditIcon
                      fontSize="inherit"
                      sx={{
                        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 30%))',
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="delete" arrow>
                  <IconButton
                    size="small"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    tabIndex={-1}
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
                </Tooltip>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Modal
        open={showEditModal}
        handleClose={() => setShowEditModal(false)}
        title="Edit Todo"
        content={
          <ItemCreator
            data={data}
            isCreate={false}
            onCancel={() => setShowEditModal(false)}
          />
        }
      />
    </>
  );
};

export default ProgressItem;
