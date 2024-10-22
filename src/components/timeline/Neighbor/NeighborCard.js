import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import MapComponent from "../../MapComponent";
import Card from "@mui/material/Card";

const NeighborCard = ({data}) => {

    const {geometry, properties} = data;
    const {name = '', status = '', address = ''} = properties;
    const [center, setCenter] = useState([36.646755, -118.705333]);

    return (
        <div className="col-sm-12 col-md-3 col-lg-3 mb-3">
            <Card>
                {geometry != null && <MapComponent
                    className={"neighbor-property-map"}
                    center={center}
                    data={[geometry]}
                    zoom={100}
                    jpa={false}
                    draw={false}
                    dashboard={true}
                />}
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        <span style={{fontWeight: 'bold'}}>Status</span> : {status}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        <span style={{fontWeight: 'bold'}}>Address</span> : {address}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default NeighborCard;
