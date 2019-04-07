data.forEach(d => {
  d["timestamp"] = new Date(
    d["YEAR"],
    d["MONTH"] - 1,
    d["DAY"],
    d["HOUR"],
    d["MINUTE"]
  );
  d["time"] = timeFormat(d["timestamp"]);
});

const ndx = crossfilter(data);
typeDim = ndx.dimension(d => {
  return d.TYPE;
});
neighbourhoodDim = ndx.dimension(d => {
  return d.NEIGHBOURHOOD;
});
monthDim = ndx.dimension(d => {
  return d.MONTH;
});
// d3.timeMonth(d.timestamp)
hourDim = ndx.dimension(d => {
  return d.HOUR;
});
monthDim = ndx.dimension(d => {
  return d3.timeWeek(d.timestamp);
});
allDim = ndx.dimension(d => {
  return d;
});
all = ndx.groupAll();

dc.dataCount(".dc-data-count")
  .crossfilter(ndx)
  .groupAll(all);

typeGroup = typeDim.group();
neighbourhoodGroup = neighbourhoodDim.group();
monthGroup = monthDim.group();
hourGroup = hourDim.group();

monthGroup = monthDim.group();

typeChart = dc.rowChart("#typeChart");
neighbourhoodChart = dc.rowChart("#neighbourhoodChart");
// monthChart = dc.barChart("#monthChart");
hourChart = dc.barChart("#hourChart");

monthChart = dc.barChart("#monthChart");

monthChart
  .width(600)
  .height(125)
  .margins({ top: 10, right: 50, bottom: 30, left: 50 })
  .dimension(monthDim)
  .group(monthGroup)
  .x(d3.scaleTime().domain([new Date(2018, 0, 1), new Date(2018, 12, 31)]))
  .xUnits(d3.timeWeeks)
  .elasticY(true);

typeChart
  .width(500)
  .height(300)
  .x(d3.scaleLinear().domain([6, 20]))
  .elasticX(true)
  .dimension(typeDim)
  .group(typeGroup);

neighbourhoodChart
  .width(500)
  .height(300)
  .x(d3.scaleLinear().domain([6, 20]))
  .elasticX(true)
  .dimension(neighbourhoodDim)
  .group(neighbourhoodGroup);

hourChart
  .width(600)
  .height(100)
  .margins({ top: 10, right: 50, bottom: 30, left: 50 })
  .elasticY(true)
  .dimension(hourDim)
  .group(hourGroup);
hourChart.x(d3.scaleLinear().domain([0, 24]));

hourChart.yAxis().ticks(5);

monthChart.yAxis().ticks(5);

const mymap = L.map("mapid");
function drawMap() {
  mymap.setView([49.2537, -123.1207], 12);

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 15,
      attribution: "leaflet-Boris",
      id: "mapbox.streets"
    }
  ).addTo(mymap);

  //Heatmap
  const geoData = [];
  _.each(allDim.top(Infinity), function(d) {
    geoData.push([d["LAT"], d["LON"], 1]);
  });
  const heat = L.heatLayer(geoData, {
    radius: 7.5,
    blur: 15,
    maxZoom: 1
  }).addTo(mymap);
}

drawMap();

charts = [monthChart, typeChart, neighbourhoodChart, hourChart];

_.each(charts, dcChart => {
  dcChart.on("filtered", (chart, filter) => {
    mymap.eachLayer(layer => {
      mymap.removeLayer(layer);
    });
    drawMap();
  });
});

dc.renderAll();
