import {React, useState} from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function PopOver({ risk_score, risk_label, risk_percentage, risk_details }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const colors = ["#fef1c1", "#fdeaa1", "#ffd977", "#fbaa24", "#e66f25", "#d54526", "#cc4326", "#9b3f21", "#85361c", "#672b13"]
  let color = risk_score ? colors[risk_score - 1] : "#A5BF45";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "mouse-over-popover" : undefined;

  return (
    <div>
      <Button 
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handleClick}
        onMouseLeave={handleClose}
        className='rounded-0' 
        sx={{
          color: risk_score < 4 ? "black" : "white", 
          backgroundColor: color,  
          "&:hover": { 
            backgroundColor: color
          }}} 
        aria-describedby={id} 
        variant="contained" 
        onClick={handleClick}>
          {risk_label}
      </Button>
      <Popover
        id={id}
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableRestoreFocus
      >
        <Typography sx={{ p: 2 }}>
            <b>Score:</b> {risk_score} <br />
            <b>Percentage:</b> {risk_percentage} <br />
            <b>Details:</b> {risk_details}
        </Typography>
      </Popover>
    </div>
  );
}
