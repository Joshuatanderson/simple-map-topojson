import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as geo from 'd3-geo'
import * as topojson from 'topojson';

const App: React.FC = () => {
  const SVG_WIDTH = 1000;
  const SVG_HEIGHT = 500;
  let svg;

  // const svg = d3.select('.App')
  //   .append('svg')
  //   .attr('width', SVG_WIDTH)
  //   .attr('height', SVG_HEIGHT)
  // const [data, setData] = useState([]);

  // let svg: any = null;

  // const fetchData = async (path: string) => {
  //   const data = require('./data/usGeo.json')
  //   return data;
  // }

  const drawContainer = () => {
    svg = d3.select('.App')
      .append('svg')
      .attr('width', SVG_WIDTH)
      .attr('height', SVG_HEIGHT)
  }

  const drawMap = (world) => {
      // define projection
    const myProjection = d3.geoNaturalEarth1()
      // creates a path generator
    const path = d3.geoPath().projection(myProjection)
      // setup lines of lat and long.
    const graticule = d3.geoGraticule()
      // add path to svg for graticule
    svg.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

      // add path for graticule outline?
    svg.append("path")
      .datum(graticule.outline)
      .attr("class", "foreground")
      .attr("d", path);

      // add data and paths for map
    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(world, world.objects.countries).features)
      .enter().append("path")
      .attr("d", path);
  }
  drawContainer()
  d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then((data) => {
    drawMap(data)
});

  // const drawProjection = () => {

  //   const projection = geo.geoAlbersUsa()
  //     .translate([SVG_WIDTH / 2, SVG_HEIGHT / 2]) // centers projection in cont
  //     .scale(1000) // scales down projection

  //   const path = d3.geoPath()
  //     // sets projection type
  //     .projection(projection)

  //   const u = svg.selectAll('path')
  //     .data(data['features'])
  //   // console.log(u)
  //   u.enter()
  //     .append('path')
  //     .attr('d', path)
  //     .style("stroke", "#fff")
  //     .style("stroke-width", "1")
  //     .style("fill", 'green')
  // }

  useEffect(() => {
    drawContainer()
    // fetchData('./data/test.json').then(resp => setData(resp))
  }, [])

  // useEffect(() => {
  //   if (svg && data.length) {
  //     console.log(svg)
  //     drawProjection()
  //   }
  // }, [data])

  return (
    <div className="App">

    </div>
  );
}

export default App;
