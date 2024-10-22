import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deletePropertyImage, getPropertyImages, setLoading} from "../../redux/actions/other";
import Typography from "@mui/material/Typography";
import ImageViewer from "../uploader/ImageViewer";
import Uploader from "../uploader/Uploader";
import {toast} from "react-toastify";
import Box from "@mui/material/Box";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ClearIcon from "@mui/icons-material/Clear";
import Grid from "@mui/material/Grid";
import {Skeleton} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const Document = ({email, property_id}) => {

    const dispatch = useDispatch();
    const {isLoggedIn, user} = useSelector(state => state.auth);
    const [propertyImages, setPropertyImages] = useState([]);
    const [uploaderType, setUploaderType] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [plugins, setPlugins] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(() => {
        if (isLoggedIn) {
            get_property_images(email !== '' ? email : user.email);
        }
    }, [property_id]);

    const get_property_images = (email) => {
        // dispatch(setLoading(true));
        setImageLoading(true);
        dispatch(getPropertyImages({email: email, property_id: property_id}))
            .then((response) => {
                // dispatch(setLoading(false));
                setImageLoading(false);
                if (response !== "No image uploaded") {
                    setPropertyImages(response);
                } else {
                    setPropertyImages([]);
                }
            })
            .catch(() => {
                // dispatch(setLoading(false));
                setImageLoading(false);
            });
    };

    const delete_property_images = (url) => {
        dispatch(setLoading(true));
        dispatch(deletePropertyImage(url))
            .then((response) => {
                toast.success("Deleted image successfully!")
                dispatch(setLoading(false));
                const index = propertyImages.indexOf(url);
                if (index > -1) {
                    propertyImages.splice(index, 1);
                }
                setPropertyImages(propertyImages);
            })
            .catch(() => {
                dispatch(setLoading(false));
            });
    };

    const onUploadSuccess = () => {
        setUploaderType(null);
        get_property_images(email !== '' ? email : user.email);
    };

    const onUploaderChange = (type) => {
        setPlugins(type === 'webcam' ? ['Webcam'] : ['']);
        setUploaderType(type);
    };

    const openImageViewer = (index) => {
        setIsOpen(true);
        setPhotoIndex(index);
    };

    const closeImageViewer = () => {
        setIsOpen(false);
    };

    return (
        <div className={"bg-white h-100 pl5 pr5"}>
            <div className="row">
                <div>
                    {user && user.user_type === "user" && <Typography variant="h5" gutterBottom>
                        Add images of your property
                    </Typography>}
                    <ImageViewer data={propertyImages}
                                 activePhoto={photoIndex}
                                 setActivePhoto={setPhotoIndex}
                                 isOpen={isOpen}
                                 onClose={closeImageViewer}/>
                    <div>
                        {property_id && user && user.user_type === "user" && <Uploader
                            property_id={property_id}
                            email={user.email}
                            uploaderType={uploaderType}
                            className={'mb-2'}
                            plugins={plugins}
                            id="avatar-image-picker"
                            onUploadSuccess={onUploadSuccess}>
                            <Box>
                                <button onClick={() => onUploaderChange('device')}
                                        className={`btn btn-primary`}>Upload image <FolderOpenIcon/></button>
                                &nbsp;
                                <button onClick={() => onUploaderChange('webcam')}
                                        className={`btn btn-primary`}>Camera <PhotoCameraIcon/></button>
                                &nbsp;
                                {uploaderType &&
                                <button onClick={() => onUploaderChange(null)} type="button"
                                        className={`btn btn-outline-dark`}>CANCEL <ClearIcon/></button>}
                            </Box>
                        </Uploader>}
                        {imageLoading ?
                            <Grid container spacing={1}>
                                {[1, 2, 3].map((option, index) => (
                                    <Grid key={index} item xs={6} md={2} className='d-flex flex-column-reverse align-items-center'>
                                        <Skeleton height={200} width={200}/>
                                    </Grid>
                                ))}
                            </Grid> :
                            <>
                                {propertyImages.length > 0 ?
                                    <Grid container spacing={1} className="mt-5">
                                        {propertyImages.map((option, index) => (
                                            <Grid key={index} item xs={6} md={2} className='d-flex flex-column-reverse align-items-center'>
                                                {user && user.user_type === "user" && <IconButton aria-label="delete"
                                                                                                  onClick={() => delete_property_images(option)}>
                                                    <DeleteIcon/>
                                                </IconButton>}
                                                <Button
                                                    onClick={() => {
                                                        openImageViewer(index);
                                                    }}>
                                                    <img src={option} align={'profile'} className='img-thumbnail' style={{height: 'auto', maxHeight: '150px'}}
                                                         alt={option}/>
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid> :
                                    <div className="row">
                                        <div className="p-5">
                                            <Typography variant="h5" gutterBottom>
                                                No data found
                                            </Typography>
                                        </div>
                                    </div>}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Document;
