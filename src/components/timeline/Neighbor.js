import React, {Fragment, useEffect, useState} from 'react';
import {setLoading, getNeighborListing} from "../../redux/actions/other";
import {useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";
import {Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import NeighborCard from "./Neighbor/NeighborCard";

const Neighbor = ({property_id}) => {

    const dispatch = useDispatch();
    const [neighborsLoading, setNeighborsLoading] = useState(false);
    const {isLoggedIn, user} = useSelector(state => state.auth);
    const [neighbors, setNeighbors] = useState([]);

    useEffect(() => {
        if (isLoggedIn && property_id) {
            get_neighbor_list();
        }
    }, [property_id]);

    const get_neighbor_list = () => {
        setNeighborsLoading(true);
        dispatch(getNeighborListing(property_id))
            .then((response) => {
                let valid = true;

                // Validate GeoJSON
                if (typeof(response) == 'object') {
                    for (const property of response) {
                        if (!property.hasOwnProperty("type") ||
                            !property.hasOwnProperty("geometry") ||
                            !property.hasOwnProperty("properties") ||
                            typeof(property?.type) !== 'string' ||
                            typeof(property?.geometry) !== 'object' ||
                            typeof(property?.properties) != 'object' || 
                            typeof(property?.geometry.coordinates) != 'object') {
                                valid = false;
                                break;
                        }
                  
                        for (const coordinate of property.geometry.coordinates[0]) {
                            if (coordinate.length !== 2) {
                                valid = false;
                                break;
                            }
                            if (typeof(coordinate[0]) != 'number' || typeof(coordinate[1]) != 'number') {
                                valid = false;
                                break;
                            }
                        }
                    }
                } else valid = false;
                
                if (valid) {
                    setNeighborsLoading(false);
                    setNeighbors(response);
                } else toast.error("Oops! Something went wrong. Please try again.");
                
            })
            .catch(() => {
                setNeighborsLoading(false);
            });
    };

    return (
        <div className={'bg-white h-100 pl5 pr5 py-4'}>
            <div className={"row"}>

                {neighborsLoading ? <>
                        {[0, 1]?.map((data, i) => {
                            return <Grid key={i} item xs={12} sm={12} md={3} container>
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
                    neighbors.length > 0 ?
                        <>
                            {neighbors?.map((data, i) => {
                                return <NeighborCard data={data} key={i}/>
                            })}
                        </> :
                        <>
                            <div className="row">
                                <div className="p-5">
                                    <Typography variant="h5" gutterBottom>
                                        There are no neighbors
                                    </Typography>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Neighbor;
