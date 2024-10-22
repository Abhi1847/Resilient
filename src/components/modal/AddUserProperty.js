import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getGeoJson, setLoading, addUserData } from "../../redux/actions/other";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import MapComponent from "../MapComponent";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Sharing from "./Sharing";
import Typography from "@mui/material/Typography";
import Select from 'react-select'

var parser = require("parse-address");

const AddUserProperty = (props) => {

    const dispatch = useDispatch();
    const [center, setCenter] = useState([36.646755, -118.705333]);
    const { userDetail = {}, closePropertyModal, refreshData, isFirstProperty } = props;
    const { email = '' } = userDetail;
    const [isDraw, setIsDraw] = useState(false);
    const [mapData, setMapData] = useState(null);
    const [addressResponse, setAddressResponse] = useState([]);
    const [geoJsonDetail, setGeoJsonDetail] = useState([]);
    const [findMyLand, setFindMyLand] = useState(true);
    const [openSharing, setOpenSharing] = useState(false);
    const [finalParam, setFinalParam] = useState(null);

    const ref = useRef(null);

    const initialValue = {
        property_type: '',
        address: '',
        zip_code: '',
        email: email,
        property_nickname: '',
        county: '',
        apn: ''
    };

    const propertySchema = Yup.object().shape({
        property_type: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        zip_code: Yup.string().required("Required"),
        county: Yup.string().required("This field is required"),
        apn: Yup.number().required("Required"),
    });

    const closeModal = (event, reason) => {
        closePropertyModal();
    };

    const findLand = () => {
        const values = ref.current.values;
        const parsedAddress = parser.parseLocation(`${values["address"]} ${values["zip_code"]}`);
        dispatch(setLoading(true));

        if (values["address"] !== '' && values["zip_code"] !== '' && values["county"] !== '' && values["apn"] !== '') {

            if (!parsedAddress || !parsedAddress.number || !parsedAddress.street || !parsedAddress.zip) {
                toast.error("Could not find address! Please try again!");
                dispatch(setLoading(false));
            } else {
                const data = { "address": values["address"], "zip": values["zip_code"], "county": values["county"], "apn": values["apn"] };
                dispatch(getGeoJson(data))
                    .then((response) => {
                        dispatch(setLoading(false));

                        if (response?.status === "error") {
                            console.error(response?.message);
                            toast.error("Oops! Something went wrong. Please try again.");
                        } else {
                            if (response && response.length > 0) {

                                const data = response;
                                setAddressResponse(data);

                                setGeoJsonDetail(data);
                                setMapData(data[0]);
                                setCenter([data[0].properties.latitude, data[0].properties.longitude]);
                                setFindMyLand(false);
                            } else {
                                toast.error("Could not find address! Please try again!");
                            }
                        }
                    })
                    .catch(() => {
                        dispatch(setLoading(false));
                    });
            }

        } else {
            toast.error("Enter address, county, apn number and zip code first! Please try again!");
            dispatch(setLoading(false));
        }

    };

    const changedGeoJson = (data) => {
        setMapData(data);
    };

    const editGeoJson = () => {
        setIsDraw(true);
        setGeoJsonDetail(null);
    };

    const cancelEditGeoJson = () => {
        setIsDraw(false);
        setGeoJsonDetail(addressResponse);
    };

    const handleSubmit = (values) => {

        if (mapData == null) {
            toast.error("Please draw your property lines");
        } else {

            let param = values;
            param['geojson'] = mapData;

            setFinalParam(param);

            if (!isFirstProperty) {
                saveProperty(param);
            } else {
                setOpenSharing(true);
            }
        }
    };

    const saveProperty = (param) => {
        dispatch(setLoading(true));

        dispatch(addUserData(param))
            .then((data) => {
                dispatch(setLoading(false));
                refreshData(data);
                setIsDraw(false);
                setMapData(null);
                toast.success("Successfully added property!");
            })
            .catch(() => {
                dispatch(setLoading(false));
            });
    };

    const sharingSubmit = () => {
        saveProperty(finalParam);
    };

    const [countyOptions, setCountyOptions] = useState([]);

    useEffect(() => {
        const fetchCounties = async () => {
            try {
                const response = await fetch('https://gist.githubusercontent.com/vitalii-z8i/bbb96d55d57f1e4342c3408e7286d3f2/raw/3b9b1fba8b226359d5a025221bb2688e9807c674/counties_list.json');
                const data = await response.json();

                const californiaCounties = data.filter(county => county.State === 'California');

                const options = californiaCounties.map(county => ({
                    value: county.County.replace(' County', ''),
                    label: county.County.replace(' County', ''),
                }));

                setCountyOptions(options);
            } catch (error) {
                console.error('Error fetching counties:', error);
            }
        };

        fetchCounties();
    }, []);

    return (
        <div className={"add_property_div rounded-3 p-3 bg-white"}>
            <div className="row">
                <div className="col-md-8">
                    <MapComponent
                        className={"find-property-map"}
                        center={center}
                        changedData={changedGeoJson}
                        data={geoJsonDetail}
                        zoom={150}
                        jpa={false}
                        draw={isDraw}
                        dashboard={true}
                    />
                </div>
                <div className="col-md-4">
                    <Formik
                        innerRef={ref}
                        initialValues={initialValue}
                        validationSchema={propertySchema}
                        onSubmit={handleSubmit}>
                        {({ errors, touched, isValidating, values, setFieldValue }) => (
                            <Form>
                                <div className="row">

                                    <Typography variant="body1" gutterBottom className="caps-text">
                                        Add Property
                                    </Typography>

                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <label>Type</label>
                                            <Field as="select" name="property_type"
                                                className={`form-control ${touched.property_type && errors.property_type ? "is-invalid" : ""}`}>
                                                <option disabled={true} value=""> None - select type from list</option>
                                                <option value="residential"> Residential</option>
                                                <option value="non_residential"> Non Residential</option>
                                            </Field>
                                            <ErrorMessage component="div" name="property_type" className="invalid-feedback" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <Field name="address" placeholder={'Address and street name'}
                                                className={`form-control ${touched.address && errors.address ? "is-invalid" : ""}`}
                                                onChange={(e) => {
                                                    setFieldValue('address', e.target.value);
                                                    setFieldValue('property_nickname', e.target.value);
                                                }} />
                                            <ErrorMessage component="div" name="address" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group mt-2">
                                            <Field name="zip_code" placeholder={'Zip code'}
                                                className={`form-control ${touched.zip_code && errors.zip_code ? "is-invalid" : ""}`} />
                                            <ErrorMessage component="div" name="zip_code" className="invalid-feedback" />
                                        </div>

                                        <div className="form-group mt-2">
                                            <Field as="select" name="county" className={`form-control ${touched.county && errors.county ? 'is-invalid' : ''}`}>
                                                <option value="">Select County</option>
                                                {countyOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                component='div'
                                                name='county'
                                                className='invalid-feedback'
                                            />
                                        </div>

                                        <div className="form-group mt-2">
                                            <Field name="apn" placeholder={'APN number'}
                                                className={`form-control ${touched.apn && errors.apn ? "is-invalid" : ""}`} />
                                            <ErrorMessage component="div" name="apn" className="invalid-feedback" />
                                        </div>

                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <label>Nickname</label>
                                            <Field name="property_nickname" placeholder={'Enter a nickname here'} className={`form-control`} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <>
                                            {!isFirstProperty && <button type="button"
                                                onClick={() => closeModal()}
                                                className="btn btn-outline-dark me-2">CANCEL
                                            </button>}
                                            {findMyLand ?
                                                <button type="button"
                                                    onClick={() => findLand()}
                                                    className="btn btn-primary mt-2">GET ANALYSIS
                                                </button> :
                                                <>
                                                    <button type="submit" className="btn btn-primary">ADD PROPERTY
                                                    </button>
                                                    {!isDraw ? <Button style={{ color: '#A5BF45' }}
                                                        endIcon={<EditIcon />}
                                                        onClick={() => editGeoJson()}> Update Property Outline?
                                                    </Button> : <Button style={{ color: '#A5BF45' }}
                                                        onClick={() => cancelEditGeoJson()}> Cancel
                                                    </Button>}
                                                </>
                                            }
                                        </>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {openSharing && <Sharing setOpenSharing={setOpenSharing} sharingSubmit={sharingSubmit} />}
                </div>
            </div>
        </div>
    );
};

export default AddUserProperty;
