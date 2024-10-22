import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DoneIcon from '@mui/icons-material/Done';
import Button from "@mui/material/Button";

const EnhancedTableToolbar = (props) => {
    const {selectedOffTaker, submitOffTaker} = props;

    return (
        <Toolbar
            sx={{pl: {sm: 2}, pr: {xs: 1, sm: 1}, bgcolor: '#a5bf455e'}}>
            <Typography
                sx={{flex: '1 1 100%'}}
                color="inherit"
                variant="subtitle2"
                component="div">
                You choose {selectedOffTaker}
            </Typography>
            <Tooltip title="Save">
                <Button className='rounded-0'
                        variant="contained"
                        onClick={() => submitOffTaker()}
                        startIcon={<DoneIcon/>}>
                    Save
                </Button>
            </Tooltip>
        </Toolbar>
    );
};

export default EnhancedTableToolbar;
