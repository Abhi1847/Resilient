import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {property_status} from "../../../helpers/common_data";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

const steps = property_status();

const ProgressStep = ({status}) => {

    const [activeStep, setActiveStep] = useState();
    const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

    useEffect(() => {
        setActiveStep(steps.indexOf(status) - 1);
    }, [status]);


    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} orientation={`${isMobile ? 'horizontal' : 'vertical'}`}
                     alternativeLabel={isMobile}>
                {steps.map((step, index) => (
                    step !== 'all' && <Step key={index}>
                        <StepLabel className={'text-capitalize'}>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default ProgressStep;
