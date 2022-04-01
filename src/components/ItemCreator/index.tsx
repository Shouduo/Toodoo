import * as React from 'react';
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import Stack from '@mui/material/Stack';
import enLocale from 'date-fns/locale/en-US';
import AddIcon from '@mui/icons-material/Add';
import { Context } from '@/pages/IndexPage';
import { ITEM_TEMPLATE, ITEM_LEVELS } from '@/utils/constants';
import { nanoid } from 'nanoid';
import CircleIcon from '@mui/icons-material/Circle';
// import { useTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';
import { map } from 'lodash';
import TodayIcon from '@mui/icons-material/Today';

const ItemCreator = () => {
  const { data, dispatch } = React.useContext(Context);
  // const theme = useTheme();

  const [content, setContent] = React.useState<string>('');
  const [level, setLevel] = React.useState<string>(ITEM_LEVELS.normal.key);
  const [startTime, setStartTime] = React.useState<number>(Date.now());
  const [stopTime, setStopTime] = React.useState<number>(
    Date.now() + ITEM_TEMPLATE.planDuration
  );
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [showErrorMsg, setShowErrorMsg] = React.useState<boolean>(false);

  const timer = React.useRef<number>();
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setContent(event.target.value);
  // };

  const onLevelIconClick = () => {
    const levelOrder = map(ITEM_LEVELS, (item) => item.key);
    const nextLevel = levelOrder[(levelOrder.indexOf(level) + 1) % 3];
    setLevel(nextLevel);
  };

  const onReset = () => {
    setContent('');
    setLevel(ITEM_LEVELS.normal.key);
    setStartTime(Date.now());
    setStopTime(Date.now() + ITEM_TEMPLATE.planDuration);
  };

  const onAdd = () => {
    if (isValid) {
      dispatch({
        type: 'add',
        payload: {
          ...ITEM_TEMPLATE,
          id: nanoid(),
          content,
          type: level,
          startTime,
          planDuration: stopTime - startTime,
        },
      });
      setContent('');
    } else {
      !showErrorMsg && setShowErrorMsg(true);
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setShowErrorMsg(false);
      }, 2000);
    }
  };

  React.useEffect(() => {
    setIsValid(content.trim() !== '' && startTime < stopTime);
  }, [content, startTime, stopTime]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
      <Stack spacing={3}>
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
                  margin: '-4px 2px 0px -8px',
                }}
              >
                <IconButton size="small" onClick={onLevelIconClick}>
                  <CircleIcon
                    fontSize="small"
                    sx={{ color: ITEM_LEVELS[level].color[500] }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* <MobileDateTimePicker
          value={value}
          onChange={(newValue) => {
            setStartTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDateTimePicker
          value={value}
          onChange={(newValue) => {
            setStartTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        <MobileDateTimePicker
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TodayIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          )}
          inputFormat="yyyy-MM-dd h:mm a"
          mask="____-__-__- __:__ _M"
          label="Start Time"
          value={startTime}
          showTodayButton
          onChange={(newValue) => {
            setStartTime(new Date(newValue).getTime());
          }}
        />
        <MobileDateTimePicker
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TodayIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          )}
          inputFormat="yyyy-MM-dd h:mm a"
          mask="____-__-__- __:__ _M"
          label="Stop Time"
          value={stopTime}
          minDateTime={startTime}
          showTodayButton
          onChange={(newValue) => {
            setStopTime(new Date(newValue).getTime());
          }}
        />
        <Stack direction="row" justifyContent="end" spacing={2}>
          <Button variant="outlined" onClick={onReset}>
            Reset
          </Button>
          <Button
            classes={!isValid ? { root: 'Mui-disabled' } : {}}
            // classes={{ root: 'Mui-disabled' }}
            variant="contained"
            endIcon={<AddIcon />}
            onClick={onAdd}
            sx={
              !isValid
                ? {
                    pointerEvents: 'auto !important',
                    cursor: 'not-allowed !important',
                  }
                : {}
            }
            // sx={{
            //   color: 'rgba(0, 0, 0, 0.26)',
            //   boxShadow: 'none',
            //   backgroundColor: 'rgba(0, 0, 0, 0.12)',
            // }}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

export default ItemCreator;
