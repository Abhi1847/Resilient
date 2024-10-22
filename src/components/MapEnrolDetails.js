import { React } from "react";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import MapComponent from "./MapComponent";
import { useDispatch } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { openRegisterModal } from "../redux/actions/other";

const MapEnrolDetails = (props) => {
  const { data } = props;
  const center = [data[0].properties.latitude, data[0].properties.longitude];
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(openRegisterModal(true));
  };

  return (
    <>
      <section id="map-section" className={"map-section-enroll"}>
        <div className="container-fluid p-0 m-0">
          <div className="row">
            <div className="col-12">
              <div className="position-absolute p-4 bg-dark shadow-lg map-box2">
                <div className="">
                  <address className="w-75">
                    <h4 className="text-light">Is this You? </h4>
                    <p className="text-light" style={{ fontSize: "12px", margin: "0 0 10px" }}>
                      if the quick search doesn't look right, try our more detailed map tool.
                    </p>
                    <Link
                      to={{
                        pathname: "/map",
                        state: {
                          center: center,
                          data: data,
                          zoom: 150,
                        },
                      }}
                      style={{
                        fontFamily: "helveticabold",
                        color: "white",
                      }}
                    >
                      Biomass Evaluation Map
                    </Link>
                    <ChevronRightIcon sx={{ color: "#A5BF45" }} />
                    <p></p>
                    <p className="text-light" style={{ fontSize: "12px" }}>
                      Otherwise, just finish the last details to make a quick account to view
                      details we have about your property
                    </p>
                    <Link
                      to={"/"}
                      onClick={() => openModal()}
                      className="btn form-control"
                      style={{ backgroundColor: "#a5bf45", color: "black" }}
                    >
                      COMPLETE SIGN UP TO VIEW
                    </Link>
                  </address>
                </div>
              </div>
              <div className="embed-responsive ">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <div className="iframe-container">
                      <MapComponent
                        className={"map-enrollment-detail-map"}
                        center={center}
                        data={data}
                        zoom={150}
                        jpa={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MapEnrolDetails;
