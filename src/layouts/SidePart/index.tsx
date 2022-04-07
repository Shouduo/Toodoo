import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import '@/renderer/App.css';

//
const MainBox = styled(Box)(({ theme }) => ({
  paddingTop: '24px',
  height: 'auto',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 64px - 24px)',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    // padding: '24px 24px 0',
    height: 'calc(100vh - 64px - 24px)',
  },
}));

//
const LeftBox = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  verticalAlign: 'top',
  width: '100%',
  transition: 'all ease .2s',
  [theme.breakpoints.up('sm')]: {
    width: '240px',
  },
}));

//
const RightBox = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  verticalAlign: 'top',
  width: '100%',
  transition: 'all ease .2s',
  [theme.breakpoints.up('sm')]: {
    marginLeft: '24px',
    width: 'calc(100% - 240px - 24px)',
  },
}));

//
const SidePart = ({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) => {
  return (
    <MainBox
      sx={{ paddingX: { xs: '16px', sm: '24px', md: '64px', lg: '128px' } }}
    >
      <LeftBox>{left}</LeftBox>
      <RightBox height="100%" overflow="auto">
        {right}
      </RightBox>
    </MainBox>
  );
};

export default SidePart;
