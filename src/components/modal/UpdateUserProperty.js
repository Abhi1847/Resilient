import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {deleteProperty, setLoading, updateUserData} from "../../redux/actions/other";
import * as Yup from "yup";
import {toast} from 'react-toastify';
import {ErrorMessage, Field, Form, Formik} from "formik";
import MapComponent from "../MapComponent";
import swal from "sweetalert";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";

const UpdateUserProperty = (props) => {

    const dispatch = useDispatch();
    const [center, setCenter] = useState([36.646755, -118.705333]);
    const {userDetail = {}, geoDetail = [], closePropertyModal, refreshData} = props;
    const {address = '', zip_code = '', property_nickname = '', property_id = '', email = '', property_type = ''} = userDetail;
    const [isDraw, setIsDraw] = useState(false);
    const [mapData, setMapData] = useState('None');
    const [geoJsonDetail, setGeoJsonDetail] = useState(null);

    const initialValue = {
        property_type: property_type == null ? '' : property_type,
        address: address,
        zip_code: zip_code,
        email: email,
        property_id: property_id,
        property_nickname: property_nickname
    };
    const propertySchema = Yup.object().shape({
        property_type: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        zip_code: Yup.string().required("Required"),
    });

    useEffect(() => {
        setGeoJsonDetail(geoDetail);
    }, [geoDetail]);

    const closeModal = () => {
        closePropertyModal();
    };

    const removeProperty = (id) => {
        swal({
            title: "Are you sure want to delete?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "Yes"],
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(setLoading(true));
                dispatch(deleteProperty(id))
                    .then(() => {
                        toast.success("Successfully deleted property!");
                        dispatch(setLoading(false));
                        refreshData();
                    })
                    .catch(() => {
                        dispatch(setLoading(false));
                    });
            } else {
                closePropertyModal();
            }
        });
    };

    const editGeoJson = () => {
        setIsDraw(true);
        setGeoJsonDetail(null);
    };

    const cancelEditGeoJson = () => {
        setIsDraw(false);
        setMapData('None');
        setGeoJsonDetail(geoDetail);
    };

    const changedGeoJson = (data) => {
        setMapData(data);
    };

    const handleSubmit = (values) => {

        let param = values;
        param['geojson'] = mapData;

        dispatch(setLoading(true));

        dispatch(updateUserData(param))
            .then((data) => {
                dispatch(setLoading(false));
                refreshData(data);
                setIsDraw(false);
                setMapData('None');
                toast.success("Successfully updated property!")
            })
            .catch(() => {
                dispatch(setLoading(false));
            });
    };

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
                        initialValues={initialValue}
                        validationSchema={propertySchema}
                        onSubmit={handleSubmit}>
                        {({errors, touched, isValidating}) => (
                            <Form>
                                <div className="row">
                                    <Typography variant="body1" gutterBottom className="caps-text">
                                        Update Property
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
                                            <ErrorMessage component="div" name="property_type" className="invalid-feedback"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <Field name="address" placeholder={'Address and street name'}
                                                   className={`form-control ${touched.address && errors.address ? "is-invalid" : ""}`}/>
                                            <ErrorMessage component="div" name="address" className="invalid-feedback"/>
                                        </div>
                                        <div className="form-group mt-2">
                                            <Field name="zip_code" placeholder={'Zip code'}
                                                   className={`form-control ${touched.zip_code && errors.zip_code ? "is-invalid" : ""}`}/>
                                            <ErrorMessage component="div" name="zip_code" className="invalid-feedback"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <label>Nickname</label>
                                            <Field name="property_nickname" placeholder={'Enter a nickname here'} className={`form-control`}/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <>
                                            <div>
                                                <button type="button"
                                                        onClick={() => closeModal()}
                                                        className="btn btn-outline-dark me-2 mt-2">CANCEL
                                                </button>
                                                <button type="button"
                                                        onClick={() => removeProperty(property_id)}
                                                        className="btn btn-outline-dark me-2 mt-2">DELETE
                                                </button>
                                                <button type="submit"
                                                        className="btn btn-primary mt-2">SAVE PROPERTY
                                                </button>
                                            </div>

                                            {!isDraw ? <Button style={{color: '#A5BF45'}}
                                                               endIcon={<EditIcon/>}
                                                               onClick={() => editGeoJson()}> Update Property Outline?
                                            </Button> : <Button style={{color: '#A5BF45'}}
                                                                onClick={() => cancelEditGeoJson()}> Cancel
                                            </Button>}
                                        </>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserProperty;
