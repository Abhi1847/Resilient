import React from "react";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const NoPropertyHeader = () => {

    return (
        <div>
            <div className={"current_progress"}>
                <div className={"row"}>
                    <div className="col-md-3">
                        <Typography variant="h5" gutterBottom className="">
                            YOUR PROPERTY ANALYSIS
                        </Typography>
                    </div>
                    <div className="col-md-6">
                        <FormControl className='w-50' size="small">
                            <InputLabel id="demo-select-small">No properties added</InputLabel>
                            <Select
                                className={'rounded-0 h-100'}
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label='No properties added'
                                inputProps={{readOnly: true}}>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoPropertyHeader;
