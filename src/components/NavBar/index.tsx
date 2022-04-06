import * as React from 'react';
import {
  styled,
  alpha,
  useTheme,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  InputBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Context } from '@/context/index';
import { ColorModeContext } from '@/renderer/App';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  '& .MuiInputBase-root': {
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CloseIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  top: '0',
  right: '0',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '6ch',
      '&:focus': {
        width: '12ch',
      },
    },
  },
}));

const OrderSwitcher = ({ onClick }: { onClick?: () => void }) => {
  const { order, setOrder } = React.useContext(Context);

  const onOrderChange = (e: React.MouseEvent<HTMLElement>) => {
    setOrder(e.currentTarget.id);
    onClick?.();
  };

  return (
    <>
      {['All', 'Time left', 'Emergency'].map((item) => (
        <Box
          id={item}
          key={item}
          fontSize="body1"
          margin="16px"
          onClick={onOrderChange}
          sx={{
            cursor: 'pointer',
            opacity: order === item ? '1 !important' : '0.5',
            '&:hover': { opacity: '0.8' },
          }}
        >
          {item}
        </Box>
      ))}
    </>
  );
};

OrderSwitcher.defaultProps = {
  onClick: null,
};

//
const ThemeSwitch = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Tooltip title={`${theme.palette.mode} mode`} arrow>
      <IconButton
        size="small"
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};
//
const NavBar = () => {
  const theme = useTheme();
  const isLargeView = useMediaQuery(theme.breakpoints.up('sm'));
  const { keyword, setKeyword } = React.useContext(Context);

  const [isExpand, setIsExpand] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isLargeView && isExpand) {
      setIsExpand(false);
    }
  }, [isLargeView, isExpand]);

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ height: '64px', justifyContent: 'space-between' }}>
        {!isLargeView && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setIsExpand(!isExpand)}
          >
            <MenuIcon />
          </IconButton>
        )}
        {isLargeView && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Toodoo
            </Typography>
            <OrderSwitcher />
          </Stack>
        )}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword.trim() !== '' && (
              <CloseIconWrapper onClick={() => setKeyword('')}>
                <CloseIcon />
              </CloseIconWrapper>
            )}
          </Search>
          <ThemeSwitch />
        </Stack>
      </Toolbar>
      <Box
        overflow="hidden"
        height={isExpand ? '130px' : '0px'}
        sx={{ transition: 'all ease .2s' }}
      >
        <OrderSwitcher
          onClick={() => {
            setIsExpand(false);
          }}
        />
      </Box>
    </AppBar>
  );
};

export default NavBar;
