export default function wkt_to_geojson(data) {
  var wkt = data["geom_as_wkt"];
  var coordinates = wkt
    .replaceAll("MULTIPOLYGON", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .split(",")
    .map((coords) => {
      var c = coords.split(" ");
      return [parseFloat(c[0]), parseFloat(c[1])];
    });

  return [
    {
      type: "Feature",
      properties: {
        latitude: data["latitude"],
        longitude: data["longitude"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [coordinates],
      },
    },
  ];
}
