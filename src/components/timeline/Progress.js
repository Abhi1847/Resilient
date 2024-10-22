import React, {useEffect, useState} from "react";
import BioInfo from "./Progress/BioInfo";
import ProgressInfo from "./Progress/ProgressInfo";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetail, setLoading} from "../../redux/actions/other";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import UpdateUserProperty from "../modal/UpdateUserProperty";
import AddUserProperty from "../modal/AddUserProperty";
import NoPropertyHeader from "./Progress/NoPropertyHeader";

const Progress = ({email, setHideTab, setPropertyId}) => {

    const dispatch = useDispatch();
    const [geoDetail, setGeoDetail] = useState(null);
    const [userDetail, setUserDetail] = useState({});
    const [mapLoading, setMapLoading] = useState(false);
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [propertyList, setPropertyList] = useState([]);
    const [addPropertyType, setAddPropertyType] = useState(null);
    const [isFirstProperty, setIsFirstProperty] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            refreshData();
        }
    }, []);

    const getDetail = (email, propertyId = null) => {
        dispatch(setLoading(true));
        setMapLoading(true);
        dispatch(getUserDetail(email))
            .then((response) => {
                setPropertyList(response);

                // Check first property or not
                if (response.length === 1) {
                    const {geometry} = response[0];
                    if (geometry != null) {
                        setIsFirstProperty(false);
                    } else {
                        setIsFirstProperty(true);
                    }
                } else {
                    setIsFirstProperty(false);
                }

                let param = response[0];
                if (propertyId) {
                    param = response.find(obj => {
                        return obj.properties.property_id === propertyId
                    })
                }
                bindData(param);

                dispatch(setLoading(false));
                setMapLoading(false);
            })
            .catch(() => {
                dispatch(setLoading(false));
                setMapLoading(false);
            });
    };

    const refreshData = (data) => {
        closePropertyModal();
        getDetail(email !== '' ? email : user.email, data ? data : null);
    };

    const handleChangeProperty = (event) => {
        const param = event.target.value;
        if (param === 'new') {
            setAddPropertyType('Add');
        } else {
            bindData(param)
        }
    };

    const bindData = (response) => {

        // console.log('SelectedProperty', response);

        const {properties, geometry} = response;

        setSelectedProperty(response);
        setPropertyId(properties?.property_id);
        setUserDetail(properties);

        if (geometry != null) {
            setGeoDetail([geometry]);
            setHideTab(false);
        } else {
            setGeoDetail(null);
            setHideTab(true);
            setAddPropertyType('Add');
        }
    };

    const openPropertyModal = () => {
        setAddPropertyType('Update');
    };

    const closePropertyModal = () => {
        setAddPropertyType(null);
    };

    return (
        <div>
            {addPropertyType == null && (
                <div className={"property_analysis"}>
                    <div className={"row pt-5 inner_top"}>
                        <div className="col-md-3">
                            <Typography variant="body1" gutterBottom className="caps-text">
                                YOUR PROPERTY ANALYSIS
                            </Typography>
                        </div>
                        <div className="col-md-6">
                            <FormControl className="w-50" size="small">
                                <InputLabel id="demo-select-small">
                                    Select property
                                </InputLabel>
                                <Select
                                    className={"rounded-0 h-100"}
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={selectedProperty || ""} // the addition of   || ''  prevents label overlap upon refresh
                                    label="Select property"
                                    onChange={handleChangeProperty}
                                >
                                    {propertyList.map((options, index) => (
                                        <MenuItem
                                            key={index}
                                            className={"text-capitalize"}
                                            value={options}
                                        >
                                            <Typography variant="body2" display="block">
                                                {options?.properties?.property_nickname
                                                    ? options?.properties?.property_nickname
                                                    : options?.properties?.address}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                    {user && user.user_type === "user" && <MenuItem className={"text-capitalize"} value={"new"}>
                                        <Button
                                            style={{color: "#A5BF45"}}
                                            endIcon={<AddIcon/>}
                                        >
                                            Add New Property
                                        </Button>
                                    </MenuItem>}
                                </Select>
                            </FormControl>
                            {addPropertyType == null && user && user.user_type === "user" && (
                                <Button
                                    style={{color: "#A5BF45"}}
                                    endIcon={<EditIcon/>}
                                    onClick={() => openPropertyModal()}
                                >
                                    Edit Property
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className={"row inner_bottom"}>
                        <BioInfo
                            userDetail={userDetail}
                            geoDetail={geoDetail}
                            mapLoading={mapLoading}
                            refreshData={refreshData}
                        />
                    </div>
                </div>
            )}

            {geoDetail == null && <NoPropertyHeader/>}

            {userDetail && addPropertyType === "Add" && (
                <AddUserProperty
                    userDetail={userDetail}
                    isFirstProperty={isFirstProperty}
                    closePropertyModal={closePropertyModal}
                    refreshData={refreshData}
                />
            )}

            {userDetail && addPropertyType === "Update" && (
                <UpdateUserProperty
                    userDetail={userDetail}
                    geoDetail={geoDetail}
                    closePropertyModal={closePropertyModal}
                    refreshData={refreshData}
                />
            )}

            {geoDetail != null && <div className={"current_progress"}>
                <ProgressInfo userDetail={userDetail}/>
            </div>}
        </div>
    );
};

export default Progress;
