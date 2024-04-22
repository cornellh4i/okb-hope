import * as React from 'react';
import Warning from "@/assets/warning-triangle.svg";
import Check from "@/assets/green_check.svg"; 
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function TooltipMargin({approved}) {
  
  const icon = approved ? <Check/> : <Warning />;
  var title = approved ? "Approved" : "Requires Approval";
  return (<Tooltip
    title={title}
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
    <div> {icon} </div>
  </Tooltip>
  );
}