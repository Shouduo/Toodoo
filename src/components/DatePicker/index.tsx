import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField, InputAdornment } from '@mui/material';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import enLocale from 'date-fns/locale/en-US';
import TodayIcon from '@mui/icons-material/Today';

const DatePicker = ({
  label,
  minDateTime,
  value,
  onChange,
}: {
  label: string;
  minDateTime?: number;
  value: number;
  onChange: (date: string | null) => void;
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
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
        label={label}
        showTodayButton
        minDateTime={minDateTime}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

DatePicker.defaultProps = {
  minDateTime: undefined,
};

export default DatePicker;
