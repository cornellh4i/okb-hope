import * as React from 'react';
import Warning from "@/assets/warning-triangle.svg";
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function TooltipMargin() {
  return (
    <Tooltip
      title="Requires Approval"
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
            {
              marginTop: '10px',
            },
          },
        },
      }}
    >
      <div><Warning /></div>
    </Tooltip >
  );
}