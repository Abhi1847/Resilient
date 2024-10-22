import React, {Fragment, useEffect, useState} from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import MapComponent from "../components/MapComponent";
import Grid from '@mui/material/Grid';
import UserInfoCard from "../components/UserInfoCard";
import {getDataForCard, getDataForMap} from "../redux/actions/other";
import {useDispatch} from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EmailIcon from '@mui/icons-material/Email';
import SendEmail from "../components/modal/SendEmail";
import {toast} from "react-toastify";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import {common_geo_json, property_status} from "../helpers/common_data";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AdminTimelineOld = () => {
    const dispatch = useDispatch();
    const [cardListing, setCardListing] = useState([]);
    const [mapListing, setMapListing] = useState([]);
    const [geoJson, setGeoJson] = useState(common_geo_json);
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState();
    const [pageSize, setPageSize] = useState(0);
    const [page, setPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        loadMapData();
    }, [geoJson, filterStatus]);

    useEffect(() => {
        loadCardData();
    }, [geoJson, page, filterStatus]);

    const loadMapData = () => {
        dispatch(getDataForMap({geojson: geoJson, status: filterStatus}))
            .then((response) => {
                setMapListing(response);
            })
            .catch(() => {
            });
    };

    const loadCardData = () => {
        setIsLoading(true);
        dispatch(getDataForCard({geojson: geoJson, page: page, status: filterStatus}))
            .then((response) => {
                setCardListing(response['data']);
                setPageSize(response['total_page']);
                setPage(response['data'].length > 0 ? response['current_page'] : 1);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    const changedData = (data) => {
        setGeoJson(data);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const openSendEmailModal = (email = '') => {
        let temp = [];
        if (email !== '') {
            setEmail(email);
            setOpenEmailModal(true);
        } else {
            if (cardListing.length > 0) {
                cardListing.map((data) => {
                    temp.push(data['email'])
                });
                setEmail(temp.toString());
                setOpenEmailModal(true);
            } else {
                setEmail('');
                toast.error('No user found');
            }
        }
    };

    const closeSendEmailModal = () => {
        setEmail('');
        setOpenEmailModal(false);
    };

    const handleChangeFilter = (event) => {
        setFilterStatus(event.target.value);
    };

    return (
        <div>
            <div className="col-sm-12 col-md-8 col-lg-8 left-map-section">
                <MapComponent className={'map-page'}
                              center={[36.646755, -118.705333]}
                              data={mapListing}
                              zoom={7}
                              changedData={changedData}
                              jpa={true}/>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4 right-list-section">
                <div className="row pt-2">
                    <div className="col-md-6">
                        <FormControl className='w-100 h-100' size="small">
                            <InputLabel id="demo-select-small">Filter by</InputLabel>
                            <Select
                                className={'rounded-0 h-100'}
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={filterStatus}
                                label="Filter by"
                                onChange={handleChangeFilter}>
                                {property_status().map((option, index) => (
                                    option !== 'sign up' &&
                                    <MenuItem key={index} className={'text-capitalize'} value={option}>
                                        <Typography variant="caption" display="block">{option}</Typography>
                                    </MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-md-6">
                        <Button className='w-100 rounded-0 bg-green' variant="contained" startIcon={<EmailIcon/>}
                                onClick={() => openSendEmailModal()}>
                            Send mail to all
                        </Button>
                    </div>
                </div>
                <div className="row pt-2">
                    {isLoading ?
                        <>
                            {[0, 1]?.map((data, i) => {
                                return <Grid key={i} item xs={12} sm={12} md={6} container>
                                    <Card className={'w-100'}>
                                        <CardHeader
                                            avatar={<Skeleton animation="wave" variant="circular" width={40} height={40}/>}
                                            action={null}
                                            title={<Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>}
                                            subheader={<Skeleton animation="wave" height={10} width="40%"/>}
                                        />
                                        <Skeleton sx={{height: 190}} animation="wave" variant="rectangular"/>
                                        <CardContent>
                                            <Fragment>
                                                <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                                                <Skeleton animation="wave" height={10} width="80%"/>
                                            </Fragment>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            })}
                        </> :
                        <>
                            {cardListing.length > 0 ?
                                <>
                                    {cardListing?.map((data, i) => {
                                        return <UserInfoCard data={data} key={i} handleOpen={openSendEmailModal} loadCardData={loadCardData}/>
                                    })}
                                </> :
                                <>
                                    <div className="row">
                                        <div className="col-12 p-5">
                                            <Typography variant="h4" gutterBottom>
                                                No matching results
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Try changing your search.
                                            </Typography>
                                        </div>
                                    </div>
                                </>}
                        </>
                    }
                    <Pagination
                        className='justify-content-around d-flex shadow-none w-100 mt-2'
                        count={pageSize}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        color="primary"
                        shape="rounded"
                    />
                </div>
            </div>
            <SendEmail
                open={openEmailModal}
                handleClose={closeSendEmailModal}
                email={email}/>
        </div>
    );
};

export default AdminTimelineOld;
