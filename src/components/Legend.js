import React, { useState, useEffect, useRef } from "react";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


const LegendChart = ({datapt}) => {
    const svgRef = useRef();
    const namess = [
       
        'Mercedes', 
        'Red Bull', 
        'Ferrari', 
        'Williams', 
        
        'Renault', 
        'McLaren', 
        
        
        
        'Haas F1 Team',
        
        'Aston Martin', 
        'Alfa Romeo',
        'AlphaTauri', 
        'Alpine F1 Team']

    const colorss = [
       
        '#6CD3BF',
        '#1E5BC6',
        '#ED1C24',
        '#37BEDD',
       
        '#FFD800',
        '#F58020',
        
        
       
        '#B6BABD',
       
        '#2D826D',
        '#B12039',
        '#4E7C9B',
        '#2293D1']

        const clearChart=()=>{
            const accessToRef = d3.select(svgRef.current)
            accessToRef.selectAll("svg").remove();
        }

    useEffect(() => {
        clearChart()


const svg = d3.select(svgRef.current)
    .append('svg')
    .attr("width", 150)
    .attr("height", 320)
    .attr("viewBox", [0, 0, 150, 380]);

svg.append("rect")
    .attr("width", 150)
    .attr("height", 380)
    .attr("stroke", "darkgrey")
    .attr("fill","#212121" )
    .attr("stroke-width", 1)
    .attr("stroke-linejoin", "round")
    .attr("stroke-opacity", 0.8);

svg.selectAll("mydots")
    .data(colorss)
    .enter()
    .append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("x", 10)
    .attr("y", function(d,i){ return 50 + i*27}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", d => d)

svg.selectAll("mylabels")
    .data(namess)
    .enter()
    .append("text")
    .attr("font-family", "Montserrat")
    // .attr("font-weight", "bold")
    .attr("x", 30)
    .attr("y", (d,i) => (60+i*27)) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", "white")//(d,i )=>colorss[i])
    .text(d => d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

}, [datapt])


return(
    <div style={{marginTop:15, marginRight: 10}}
        ref={svgRef}>
        </div>
)
}

export default LegendChart;