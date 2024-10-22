import {React, useState} from "react";
import {FeatureGroup, Popup, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";

import ImageViewer from "./uploader/ImageViewer";
import Button from "@mui/material/Button";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import MobileStepper from "@mui/material/MobileStepper";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    stepper: {
        padding: '0 !important',
        background: 'transparent !important'
    },
    galleryImg: {
        height: '150px',
        width: '100%'
    }
}));

const markerIcon = L.icon({
    iconSize: [41, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "/img/logs.png",
    shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
});

const WoodPopupComponent = (props) => {

    const {points = []} = props;

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();

    const closeImageViewer = () => {
        setIsOpen(false);
    };

    const openImageViewer = (index) => {
        setIsOpen(true);
        setPhotoIndex(index);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            {points.map((feature, index) => {
                const {estimate_of_biomass_detected = '', description = '', img_url = []} = feature.properties;
                return (
                    <FeatureGroup color="purple" key={index}>
                        <Popup>
                            <div><b>Estimate biomass:</b> {estimate_of_biomass_detected} Tonnes</div>
                            <div><b>Description:</b> {description} </div>
                            <ImageViewer data={img_url}
                                         activePhoto={photoIndex}
                                         setActivePhoto={setPhotoIndex}
                                         isOpen={isOpen}
                                         onClose={closeImageViewer}/>
                            {img_url.map((option, index) => (
                                <Button
                                    key={index}
                                    onClick={() => {
                                        openImageViewer(index)
                                    }}
                                    className={index !== activeStep ? 'd-none w-100 p-0' : 'w-100 p-0'}>
                                    <img src={option}
                                         align={'profile'}
                                         className={classes.galleryImg}
                                         alt={option}/>
                                </Button>
                            ))}
                            <MobileStepper
                                className={classes.stepper}
                                variant="dots"
                                steps={img_url.length}
                                position="static"
                                activeStep={activeStep}
                                nextButton={<Button className={'stepper-next'} size="small" onClick={handleNext} disabled={activeStep === img_url.length - 1}>
                                    <KeyboardArrowRight/>
                                </Button>}
                                backButton={<Button className={'stepper-back'} size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    <KeyboardArrowLeft/>
                                </Button>}
                            />
                        </Popup>

                        <Marker position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                                icon={markerIcon}/>
                    </FeatureGroup>
                );
            })}
        </>
    );
};

export default WoodPopupComponent;
