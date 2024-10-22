import { React } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import GeoData from "./GeoData";
import GeoJson from "./GeoJson";
import WoodPopupComponent from "./WoodPopupComponent";

const MapComponent = (props) => {
  const {
    className,
    center,
    data = [],
    zoom,
    changedData,
    jpa,
    enableSearch = false,
    draw = false,
    tooltip = false,
    dashboard = false,
  } = props;

  let points = [],
    polygons = [];
  if (jpa) {
    points = data && data.filter((el) => el.geometry.type === "Point");
    polygons = data && data.filter((el) => el.geometry.type !== "Point");
  }

  return (
    <div className={className}>
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        <TileLayer
          url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />
        {jpa ? (
          <>
            <FeatureGroup>
              <GeoData data={polygons} enableSearch={enableSearch} changedData={changedData} />
            </FeatureGroup>
            {points.length > 0 && <WoodPopupComponent points={points} />}
          </>
        ) : (
          <FeatureGroup>
            <GeoJson
              data={data}
              enableSearch={enableSearch}
              draw={draw}
              changedData={changedData}
              tooltip={tooltip}
              dashboard={dashboard}
            />
          </FeatureGroup>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
