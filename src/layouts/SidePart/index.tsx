import * as React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import '@/renderer/App.css';

//
const MainBox = styled(Box)(({ theme }) => ({
  margin: '24px 16px 0',
  height: 'auto',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    margin: '24px 24px 0',
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
    <MainBox>
      <LeftBox>{left}</LeftBox>
      <RightBox height="100%" overflow="auto">
        {right}
      </RightBox>
    </MainBox>
  );
};

export default SidePart;
