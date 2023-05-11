import React, { useState, useEffect, useRef } from "react";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


const LineChart = ({data, teamLine}) => {
    const svgRef = useRef();
    const margin = {top: 20, bottom: 30, left: 40, right: 30};
    const width = 500//window.innerWidth/3//850
    const height = 400//window.innerHeight/3//600

    // console.log(data)

    let toRemove = ["ToroRosso", "ManorMaruss", "LotusF1", "Sauber", "ForceIndia", "RacingPoint", 'ManorMarussia', 'Marussia', 'Caterham', 'Lotus']

    let filter_data = data.filter( function( el ) {
      return !toRemove.includes( el.name );
    } );

    const X = d3.map(filter_data, d => +d.year)
    const Y = d3.map(filter_data, d => +d.position)
    const Z = d3.map(filter_data, d => d.name)

    let xRange = [margin.left, width - margin.right] 
    let yRange = [height - margin.bottom,margin.top]

    const xDomain = d3.extent(X);
    const yDomain = [10.5, 0.5] //d3.extent(Y);
    let zDomain = Z;
    const I = d3.range(X.length).filter(i => Z[i]);

    const xScale = d3.scaleLinear(xDomain, xRange);
    const yScale = d3.scaleLinear(yDomain, yRange);

    const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 60).tickSizeOuter(0);

    // console.log(Z)

    const clearChart=()=>{
      const accessToRef = d3.select(svgRef.current)
      accessToRef.select("svg").remove();
  }
  

    useEffect(() => {

    const sumstat = Array.from(d3.group(filter_data, d => d.name), ([key, value]) => ({key, value}))
    // d3.map(sumstat, d => d.value.map(d => console.log(+d.year)))

    let mediaName = sumstat.map(d => d.key) 
    // console.log(mediaName)

    let constructor_color_map = {
      'ToroRosso':'#0000FF',
      'Mercedes':'#6CD3BF',
      'RedBull':'#1E5BC6',
      'Ferrari':'#ED1C24',
      'Williams':'#37BEDD',
      'ForceIndia':'#FF80C7',
      'Virgin':'#c82e37',
      'Renault':'#FFD800',
      'McLaren':'#F58020',
      'Sauber':'#006EFF',
      'Lotus':'#FFB800',
      'HRT':'#b2945e',
      'Caterham':'#0b361f',
      'Lotus F1':'#FFB800',
      'Marussia':'#6E0000',
      'Manor Marussia':'#6E0000',
      'HaasF1Team':'#B6BABD',
      'Racing Point':'#F596C8',
      'AstonMartin':'#2D826D',
      'AlfaRomeo':'#B12039',
      'AlphaTauri':'#4E7C9B',
      'AlpineF1Team':'#2293D1'
  }


    const line = d3.line()
      .defined(i => filter_data[i])
      .curve(d3.curveLinear)
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

    const svg = d3.select(svgRef.current)
    .attr("class", "linechart")
      .append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-20, 0, width+20, height])
      .attr("style", "max-width: 100%; height: max-content; height: intrinsic;")

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "axisWhite")
      .call(xAxis)

      
      svg.append("text")
      .attr("class", "axisLabel")
      .attr("text-anchor", "middle")
    .attr("x", width/2+30) 
    .attr("y", height) 
    .text("Year")

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "axisWhite")
      .call(yAxis)

    svg.append("text")
    .attr("class", "axisLabel")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("Position")
      
    const path = svg.append("g")
    .attr("class", "path")
    .attr("fill", "none")
    .attr("stroke", "blue")
    // .attr("stroke-linecap", strokeLinecap)
    // .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-width", 2)
    // .attr("stroke-opacity", strokeOpacity)
  .selectAll("path")
  .data(d3.group(I, i => Z[i]))
  .join("path")
    // .style("mix-blend-mode", mixBlendMode)
    .attr("stroke", (d,i) => constructor_color_map[d[0]])
    .attr("opacity", d => {
      if(teamLine === undefined) return 1;
      return d[0] === teamLine ? 1 : 0.2;
      // return 1;
    })
    .attr("d", ([, I]) => line(I));
    

    // let legend = d3.select("svg")
    //     .selectAll('g.legend')
    //     .data(sumstat)
    //     .enter()
    //     .append("g")
    //     .attr("class", "legend");
    
    //     legend.append("circle")
    //     .attr("cx", 800)
    //     .attr('cy', (d, i) => i * 30 + 100)
    //     .attr("r", 5)
    //     .style("fill", d => constructor_color_map[d.key])
    
        // legend.append("text")
        // .attr("font-size", 13)
        // .attr("fill", "white")
        // .attr("x", 820)
        // .attr("y", (d, i) => i * 30 + 100)
        // .text(d => d.key)
        
        
    }, [data,teamLine])
    if(teamLine != undefined) clearChart()
    // clearChart()
    


    return(
        <div
            ref={svgRef}>

            </div>
    )
}

export default LineChart;