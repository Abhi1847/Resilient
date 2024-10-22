import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import MapComponent from "../components/MapComponent";
import MapBar from "../components/MapBar";

const Map = (props) => {
  const [data = null, setData] = useState(props.location.state?.data);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [draw, setDraw] = useState(false);
  const center = [36.646755, -118.705333];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function setDrawing(val) {
    setDraw(val);
    setData([]);
  }

  const changedData = (data) => {
    setData(data);
  };

  return (
    <div>
      <MapBar setDrawing={(val) => setDrawing(val)} />
      <MapComponent
        className={"map-page"}
        changedData={changedData}
        enableSearch={true}
        center={center}
        data={data}
        zoom={150}
        jpa={false}
        draw={draw}
        tooltip={!isLoggedIn}
      />
    </div>
  );
};

export default Map;
