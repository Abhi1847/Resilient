import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Skeleton} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import MapComponent from "../../MapComponent";
import FindProperty from "../../FindProperty";
import {saveGeoJson, setLoading, setSelectedProperty, updateUserData} from "../../../redux/actions/other";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import ModeIcon from "@mui/icons-material/Mode";
import Button from "@mui/material/Button";
import BurnPop from './BurnPop';
import { toast } from 'react-toastify';


const BioInfo = ({userDetail, geoDetail, mapLoading, refreshData}) => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const [isDraw, setIsDraw] = useState(false);
    const [mapData, setMapData] = useState('None');
    const [geoJsonDetail, setGeoJsonDetail] = useState(null);

    const center = [36.646755, -118.705333];
    const {
        estimate_of_biomass_detected = '',
        name = '',
        email = '',
        address = '',
        zip_code = '',
        phone = '',
        risk_details = '',
        risk_label = '',
        risk_percentage = '',
        risk_score = ''
    } = userDetail;

    useEffect(() => {
        setGeoJsonDetail(geoDetail);
    }, [geoDetail]);

    // Find property by address if geojson is not set
    const findProperty = (data) => {
        dispatch(setLoading(true));
        var params = {
            property_nickname: '',
            address: data['query']['address'],
            zip_code: data['query']['zip'],
            email: user.email,
            geojson: data['response'][0],
            property_type: 'None',
        };
        dispatch(saveGeoJson(params)).then(() => {
            toast.success("Successfully added property!");
            dispatch(setSelectedProperty({}));
            dispatch(setLoading(false));
            refreshData();
        });
    };

    // Get draw data
    const changedData = (data) => {
        setMapData(data);
    };

    return (
        <>
            <div className={"col-md-4 col-sm-12 mt-3"}>
                <div className={'d-flex justify-content-evenly bg-white rounded-3 p-3 mb-2'}>
                    <div>
                        <p className="text-muted m-0"> Biomass Estimate </p>
                        {estimate_of_biomass_detected !== '' ?
                            <Typography variant="h5"> {estimate_of_biomass_detected} Tonnes </Typography> :
                            <Skeleton height={20} width={150}/>}
                    </div>
                    <div className={'divider'}/>
                    <div>
                        <p className="text-muted m-0">Burn Risk</p>
                        {risk_label !== '' &&  risk_label !== null?
                            <Typography className={'text-capitalize'} variant="h5">
                                <BurnPop
                                    risk_score={risk_score}
                                    risk_label={risk_label}
                                    risk_percentage={risk_percentage}
                                    risk_details={risk_details}>
                                </BurnPop>
                            </Typography> :
                            <Skeleton height={20} width={150}/>}
                    </div>
                </div>
                <div className={'rounded-3 p-3 bg-white'}>
                    <table>
                        <tr>
                            <td className={'p-2'}><b>Name :&nbsp;</b></td>
                            <td>
                                {name ?
                                    <span className="text-muted"> {name} </span> :
                                    <Skeleton height={20} width={150}/>}
                            </td>
                        </tr>
                        <tr>
                            <td className={'p-2'}><b>Email :&nbsp;</b></td>
                            <td>
                                {email ?
                                    <span className="text-muted"> {email} </span> :
                                    <Skeleton height={20} width={150}/>}
                            </td>
                        </tr>
                        <tr>
                            <td className={'p-2'}><b>Address:&nbsp;</b></td>
                            <td>
                                {address ?
                                    <span className="text-muted"> {address} </span> :
                                    <Skeleton height={20} width={150}/>}
                            </td>
                        </tr>
                        <tr>
                            <td className={'p-2'}><b>Zipcode:&nbsp;</b></td>
                            <td>
                                {zip_code ?
                                    <span className="text-muted"> {zip_code} </span> :
                                    <Skeleton height={20} width={150}/>}
                            </td>
                        </tr>
                        <tr>
                            <td className={'p-2'}><b>Phone :&nbsp;</b></td>
                            <td>
                                {phone ?
                                    <span className="text-muted"> {phone} </span> :
                                    <Skeleton height={20} width={150}/>}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className={"col-md-8 col-sm-12 mt-3"}>
                <div className={"biomass-map rounded-3 p-3 bg-white"}>
                    {mapLoading ? (
                        <LoadingButton
                            className="w-100"
                            style={{height: "20rem"}}
                            loading
                            variant="contained"
                        />
                    ) : (
                        geoDetail != null ? <MapComponent
                                className={"find-property-map"}
                                center={center}
                                data={geoJsonDetail}
                                changedData={changedData}
                                zoom={150}
                                jpa={false}
                                draw={isDraw}
                                dashboard={true}
                            /> :
                            <FindProperty navigateEnrolDetails={(data) => findProperty(data)}
                            address={address} zip_code={zip_code}/>
                    )}
                </div>
            </div>
        </>

    );
};

export default BioInfo;
