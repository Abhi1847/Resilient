import React, {useRef, useEffect, useState} from "react";
import {GeoJSON, useMap, useMapEvents} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import {useDispatch, useSelector} from "react-redux";
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import {setSelectedGeo} from "../redux/actions/other";
import {common_geo_json} from "../helpers/common_data";

export default function GeoData(props) {
    const {data = [], enableSearch = false, changedData} = props;
    const layerRef = useRef(null);
    const map = useMap();
    const {selectedGeo} = useSelector(state => state.other);
    const dispatch = useDispatch();
    const [drawLayer, setDrawLayer] = useState(null);
    const [isFly, setIsFly] = useState(false);

    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
        provider: provider,
        showMarker: false,
        style: 'bar'
    });

    // Get all property listing and calculate them
    useEffect(() => {
        const layer = layerRef.current;
        layer.clearLayers();
        addLayer(layer, data);
        calculate(data);
    }, [data]);

    // Highlight layer after select property
    useEffect(() => {
        onSelect(selectedGeo);
    }, [selectedGeo]);

    // Add search address component if required
    useEffect(() => {
        if (enableSearch) {
            map.addControl(searchControl);
            return () => map.removeControl(searchControl);
        }
    }, []);

    const onSelect = (property_id) => {
        const layer = layerRef.current;
        layer.eachLayer(function (layer) {
            if (layer.feature.properties.property_id === property_id) {
                let coordinates = layer.feature.geometry.coordinates[0][0], zoom = map.getBoundsZoom(layer.getBounds()) - 1;
                setIsFly(true);
                map.flyTo([coordinates[1], coordinates[0]], zoom, {duration: 1});
                setTimeout(() => {
                    layer.openPopup();
                }, 1000);
            }
        });
    };

    const addLayer = (layer, data) => {
        const jsonData = {type: 'FeatureCollection', "features": data};
        if (data != null && data.length > 0) {
            layer.addData(jsonData);
            // console.log('zoomData addLayer', zoomedGeo);
            // map.fitBounds(layer.getBounds());
        }
    };

    const onEachFeature = (feature, layer) => {
        if (feature.properties) {
            const {estimate_of_biomass_detected = '', color = 'white'} = feature.properties;
            const style = `background-color: ${color}; padding: 5px; color:${color === 'yellow' ? 'black' : 'white'}`;
            layer.bindTooltip(`<span style="${style}"><b>${estimate_of_biomass_detected} Tonnes</b></span>`, {interactive: true, permanent: true, direction: "top"});
            layer.bindPopup('<div><p><span>Estimate biomass: ' + estimate_of_biomass_detected + ' Tonnes</span></p></div>');
            layer.on({click: clickToFeature.bind(this)});
        }
    };

    const clickToFeature = (e) => {
        if (!drawLayer) {
            var layer = e.target;
            dispatch(setSelectedGeo(layer.feature.properties.property_id));
        }
    };

    const onCreated = (e) => {
        changedData(e.layer.toGeoJSON());
        setDrawLayer(e.layer);
    };

    const onDeleted = (e) => {
        if (Object.keys(e.layers._layers).length > 0) {
            changedData(common_geo_json);
            setDrawLayer(null);
            dispatch(setSelectedGeo(null));
        }
    };

    const onStyle = (feature, layer) => {
        let {color = 'red'} = feature.properties;
        return {color: color};
    };

    const calculate = (data) => {
        if (data != null && data.length > 0) {
            let totalBioMass = 0;
            data.map((val) => {
                const {estimate_of_biomass_detected = ''} = val['properties'];
                totalBioMass += Number(estimate_of_biomass_detected);
            });

            // Get overall total of draw layer and show as tooltip
            if (drawLayer != null) {
                drawLayer.bindPopup('<div><p><span>Total biomass: ' + totalBioMass + ' Tonnes</span></p></div>');
                drawLayer.openPopup();
            }
        }
    };

    const mapEvents = useMapEvents({
        zoomend: () => {
            setIsFly(false);
            getZoomedData(mapEvents);
        },
        dragend: () => {
            setIsFly(false);
            getZoomedData(mapEvents);
        }
    });

    const getZoomedData = (data) => {
        const _northEast = data.getBounds()['_northEast'],
            _southWest = data.getBounds()['_southWest'],
            json = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "coordinates": [
                        [
                            [_northEast['lng'], _northEast['lat']],
                            [_northEast['lng'], _southWest['lat']],
                            [_southWest['lng'], _southWest['lat']],
                            [_southWest['lng'], _northEast['lat']],
                            [_northEast['lng'], _northEast['lat']],
                        ]
                    ],
                    "type": "Polygon"
                }
            };
        if (!isFly) {
            dispatch(setSelectedGeo(null));
            changedData(json);
        }
    };

    return (
        <div>
            <GeoJSON ref={layerRef} onEachFeature={onEachFeature} style={onStyle}>
                <EditControl
                    position="topright"
                    edit={{remove: drawLayer != null, edit: false}}
                    onCreated={onCreated}
                    onDeleted={onDeleted}
                    draw={{
                        polyline: false,
                        marker: false,
                        circlemarker: false,
                        circle: false,
                        polygon: drawLayer == null,
                        rectangle: drawLayer == null,
                        workaround: Math.random()
                    }}/>
            </GeoJSON>
        </div>
    );
}
