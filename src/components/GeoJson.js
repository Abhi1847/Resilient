import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GeoJSON, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { getGeoJson, setSelectedProperty, openRegisterModal } from "../redux/actions/other";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
var parser = require("parse-address");

export default function GeoData(props) {
  const {
    data = [],
    draw = false,
    enableSearch = false,
    changedData,
    tooltip = false,
    dashboard = false,
  } = props;
  const map = useMap();
  const layerRef = useRef(null);
  const dispatch = useDispatch();
  const [drawLayer, setDrawLayer] = useState(null);
  const searchControl = new GeoSearchControl({
    notFoundMessage: "Address could not be found.",
    provider: new OpenStreetMapProvider({
      params: {
        "accept-language": "en",
        countrycodes: "us",
      },
    }),
    showMarker: false,
    style: "bar",
  });

  // If search is enabled, add provider to map and route events to handler
  useEffect(() => {
    if (enableSearch) {
      map.addControl(searchControl);
      map.on("geosearch/showlocation", searchGeoJson);
      return () => map.removeControl(searchControl);
    }
  });

  // Add given data as geojson layer to map
  useEffect(() => {
    const layer = layerRef.current;
    layer.clearLayers();

    // Remove drawn layer on Edit dashboard info
    if (drawLayer && dashboard) {
      map.removeLayer(drawLayer);
    }
    setDrawLayer(null);

    addData(layer, data);
  }, [data]);

  function searchGeoJson(e) {
    const location = e.location.label.split(", ");
    const address = `${location[0]} ${location[1]}`;
    const zip = `${location.at(-2)}`;
    const parsed = parser.parseLocation(`${address}, ${zip}`);

    if (parsed.number && parsed.street && parsed.zip) {
      const data = {"address": address, "zip": zip};
      dispatch(getGeoJson(data)).then(
        (response) => {
          if (response && response.length > 0) {
            dispatch(
              setSelectedProperty({
                response: response,
              })
            );
            changedData(response);
          }
        },
        (error) => {
          const message =
            (error.response && error.response.data && error.response.data) ||
            error.message ||
            error.toString();
          console.error(message);
        }
      );
    }
  }

  const addData = (layer, data) => {
    if (data != null && data.length > 0) {
      const jsonData = { type: "FeatureCollection", features: data };
      layer.addData(jsonData);
      map.fitBounds(layer.getBounds());
    }
  };

  const onEachFeature = (feature, layer) => {
    if (tooltip) {
      layer.bindTooltip(`<button class="map-button">Register</button>`, { direction: "top" });
      layer.on({ click: clickToRegister.bind(this) });
    }
  };

  const clickToRegister = (e) => {
    let geojson = e.target.toGeoJSON();
    geojson.properties.longitude = geojson.geometry.coordinates[0][0][0];
    geojson.properties.latitude = geojson.geometry.coordinates[0][0][1];
    dispatch(
      setSelectedProperty({
        response: [geojson],
      })
    );
    dispatch(openRegisterModal(true));
  };

  const onStyle = (feature, layer) => {
    let { color = "blue" } = feature.properties;

    // Calculate color based on BDMT metric
    if (color === "blue" && feature.properties?.estimate_of_biomass_detected) {
      let bdmt = feature.properties?.estimate_of_biomass_detected;
      if (bdmt < 100) color = "lime";
      else if (bdmt >= 100 && bdmt < 300) color = "yellow";
      else if (bdmt >= 300) color = "red";
    }

    return { color: color };
  };

  const onCreated = (e) => {
    if (dashboard) {
      changedData(e.layer.toGeoJSON());
      setDrawLayer(e.layer);
    } else {
      let geojson = e.layer.toGeoJSON();
      geojson.properties.longitude = geojson.geometry.coordinates[0][0][0];
      geojson.properties.latitude = geojson.geometry.coordinates[0][0][1];
      dispatch(
        setSelectedProperty({
          response: [geojson],
        })
      );
      changedData([geojson]);
      setDrawLayer(e.layer);
    }
  };

  const onDeleted = (e) => {
    if (Object.keys(e.layers._layers).length > 0) {
      changedData(null);
      setDrawLayer(null);
    }
  };

  const onDeleteStart = () => {
    const layer = layerRef.current;
    layer.clearLayers();
  };

  return (
    <div>
      <GeoJSON ref={layerRef} onEachFeature={onEachFeature} style={onStyle}>
        {draw ? (
          <EditControl
            position="topright"
            onCreated={onCreated}
            onDeleted={onDeleted}
            onDeleteStart={onDeleteStart}
            edit={{ remove: drawLayer != null, edit: false }}
            draw={{
              polyline: false,
              marker: false,
              circlemarker: false,
              rectangle: false,
              circle: false,
              polygon: drawLayer === null,
              workaround: Math.random(),
            }}
          />
        ) : null}
      </GeoJSON>
    </div>
  );
}
