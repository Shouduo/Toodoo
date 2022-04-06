import * as React from 'react';
import {
  Stack,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Palette,
  PaletteColor,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Context } from '@/context/index';
import {
  ITEM_TEMPLATE,
  ITEM_LEVELS,
  DEFAULT_DURATION,
  ItemType,
} from '@/utils/constants';
import { nanoid } from 'nanoid';
import { map } from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import SaveIcon from '@mui/icons-material/Save';
import DatePicker from '@/components/DatePicker';

interface Props {
  data?: ItemType;
  isCreate?: boolean;
  onCancel?: () => void;
}

const ItemCreator = ({ data, isCreate, onCancel }: Props) => {
  const { dispatch } = React.useContext(Context);
  const theme = useTheme();

  const [content, setContent] = React.useState<string>(data?.content ?? '');
  const [level, setLevel] = React.useState<string>(
    data?.level ?? ITEM_LEVELS.normal.key
  );
  const [startTime, setStartTime] = React.useState<number>(
    data?.startTime ?? Date.now()
  );
  const [endTime, setEndTime] = React.useState<number>(
    data?.endTime ?? Date.now() + DEFAULT_DURATION
  );
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [showErrorMsg, setShowErrorMsg] = React.useState<boolean>(false);

  const timer = React.useRef<number>();
  //
  const onLevelIconClick = () => {
    const levelOrder = map(ITEM_LEVELS, (item) => item.key);
    const nextLevel = levelOrder[(levelOrder.indexOf(level) + 1) % 3];
    setLevel(nextLevel);
  };
  //
  const onReset = () => {
    setContent('');
    setLevel(ITEM_LEVELS.normal.key);
    setStartTime(Date.now());
    setEndTime(Date.now() + DEFAULT_DURATION);
  };
  //
  const onConfirm = () => {
    if (isValid) {
      dispatch({
        type: isCreate ? 'add' : 'update',
        payload: {
          ...ITEM_TEMPLATE,
          id: isCreate ? nanoid() : data?.id ?? '',
          content,
          level,
          startTime,
          endTime,
        },
      });
      isCreate ? setContent('') : onCancel?.();
    } else {
      !showErrorMsg && setShowErrorMsg(true);
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setShowErrorMsg(false);
      }, 2000);
    }
  };

  React.useEffect(() => {
    setIsValid(content.trim() !== '' && startTime < endTime);
  }, [content, startTime, endTime]);

  return (
    <Stack spacing={3} sx={{ padding: '16px 0' }}>
      <TextField
        id="outlined-multiline-flexible"
        size="small"
        label="Content"
        placeholder="What's need to be done..."
        required
        multiline
        minRows={2}
        maxRows={4}
        value={content}
        // onChange={handleChange}
        onChange={({ target }) => setContent(target.value)}
        {...(showErrorMsg && content.trim() === ''
          ? { error: true, helperText: 'Content is required' }
          : {})}
        sx={{
          '& .MuiFormHelperText-root': {
            position: 'absolute',
            bottom: '-18px',
            margin: '0',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{
                alignSelf: 'start',
                height: 'auto',
                margin: '-4px 2px 0px -6px',
              }}
            >
              <Tooltip title={ITEM_LEVELS[level].label} arrow>
                <IconButton size="small" onClick={onLevelIconClick}>
                  <CircleIcon
                    fontSize="small"
                    sx={{
                      color: (
                        theme.palette[
                          ITEM_LEVELS[level].color as keyof Palette
                        ] as PaletteColor
                      ).main,
                    }}
                  />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <DatePicker
        label="Start Time"
        value={startTime}
        onChange={(newValue) => setStartTime(Date.parse(newValue!))}
      />
      <DatePicker
        label="Start Time"
        minDateTime={startTime}
        value={endTime}
        onChange={(newValue) => setEndTime(Date.parse(newValue!))}
      />
      <Stack direction="row" justifyContent="end" spacing={2}>
        <Button variant="outlined" onClick={isCreate ? onReset : onCancel}>
          {isCreate ? 'Reset' : 'Cancel'}
        </Button>
        <Button
          classes={!isValid ? { root: 'Mui-disabled' } : {}}
          variant="contained"
          endIcon={isCreate ? <AddIcon /> : <SaveIcon />}
          onClick={onConfirm}
          sx={
            !isValid
              ? {
                  pointerEvents: 'auto !important',
                  cursor: 'not-allowed !important',
                }
              : {}
          }
        >
          {isCreate ? 'Add' : 'Save'}
        </Button>
      </Stack>
    </Stack>
  );
};

ItemCreator.defaultProps = {
  data: {
    id: '',
    content: '',
    level: 'normal',
    startTime: Date.now(),
    endTime: Date.now() + DEFAULT_DURATION,
    finishTime: null,
    isDone: false,
  },
  isCreate: true,
  onCancel: () => {},
};
export default ItemCreator;
