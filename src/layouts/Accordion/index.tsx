import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { isString } from 'lodash';
import { useTheme } from '@mui/material/styles';

export interface AccordionProps {
  summary: string | React.ReactElement;
  detail: string | React.ReactElement;
  defaultOpen?: boolean;
  showArrow?: boolean;
  disabled?: boolean;
}

const Accordion = ({
  summary,
  detail,
  defaultOpen,
  showArrow,
  disabled,
}: AccordionProps) => {
  const theme = useTheme();
  const [isExpand, setIsExpand] = React.useState(defaultOpen);
  const [detailHeight, setDetailHeight] = React.useState(0);
  const detailRef = React.useRef<HTMLDivElement>(null);

  const onToggle = () => {
    !disabled && setIsExpand(!isExpand);
  };

  const OnDetailHeightChange = () => {
    setDetailHeight(detailRef.current?.clientHeight ?? 0);
  };

  React.useEffect(() => {
    OnDetailHeightChange();
    window.addEventListener('resize', OnDetailHeightChange);
    return () => {
      window.removeEventListener('resize', OnDetailHeightChange);
    };
  }, [detailRef]);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: '48px',
          width: '100%',
          margin: '4px 0',
          borderRadius: '4px',
          bgcolor: 'background.default',
          transition: 'filter ease .2s',
          ...(!disabled
            ? {
                cursor: 'pointer',
                '&:hover': { filter: 'invert(0.1)' },
              }
            : {}),
        }}
        onClick={onToggle}
      >
        {isString(summary) ? (
          <Typography variant="h6" noWrap component="div" color="text.primary">
            {summary}
          </Typography>
        ) : (
          summary
        )}
        {!disabled && showArrow && (
          <KeyboardArrowDownIcon
            sx={{
              color: 'text.primary',
              transition: 'all ease .2s',
              transform: `rotate(${isExpand ? '180deg' : '0deg'})`,
            }}
          />
        )}
      </Stack>
      <Box
        maxHeight={!disabled && !isExpand ? '0px' : `${detailHeight + 48}px`}
        overflow="hidden"
        sx={{ transition: 'all ease .2s' }}
      >
        <Box ref={detailRef}>{detail}</Box>
      </Box>
    </Box>
  );
};

Accordion.defaultProps = {
  defaultOpen: true,
  showArrow: true,
  disabled: false,
};

export default Accordion;
