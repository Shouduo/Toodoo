import * as React from 'react';
import {
  Box,
  Stack,
  Container,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
// import icon from '@/../assets/icon.svg';
import '@/renderer/App.css';

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

//
const MainBox = styled(Box)(({ theme }) => ({
  margin: '0 48px',
  height: 'auto',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    height: 'calc(100vh - 64px)',
    // backgroundColor: 'blue',
  },
}));

//
const LeftBox = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  verticalAlign: 'top',
  marginTop: '24px',
  width: '100%',
  transition: 'all ease .2s',
  // opacity: 0.5,
  [theme.breakpoints.up('sm')]: {
    width: '280px',
    // backgroundColor: 'blue',
  },
}));

//
const RightBox = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  verticalAlign: 'top',
  marginTop: '24px',
  width: '100%',
  transition: 'all ease .2s',
  // opacity: 0.5,
  [theme.breakpoints.up('sm')]: {
    marginLeft: '24px',
    width: 'calc(100% - 280px - 24px)',
    // backgroundColor: 'red',
  },
}));

const SidePart = ({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) => {
  return (
    <MainBox>
      <LeftBox
        // bgcolor="lightblue"
        height="200px"
      >
        {left}
      </LeftBox>
      <RightBox
        // bgcolor="pink"
        height="100%"
        overflow="auto"
      >
        {right}
      </RightBox>
    </MainBox>
  );
};

export default SidePart;
