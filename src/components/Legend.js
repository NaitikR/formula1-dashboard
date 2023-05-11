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
    .attr("height", 400)
    .attr("viewBox", [0, 0, 150, 400]);
   

svg.selectAll("mydots")
    .data(colorss)
    .enter()
    .append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("x", 15)
    .attr("y", function(d,i){ return 20 + i*15}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", d => d)

svg.selectAll("mylabels")
    .data(namess)
    .enter()
    .append("text")
    .attr("x", 30)
    .attr("y", (d,i) => (27+i*15)) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", (d,i )=>colorss[i])
    .text(d => d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

}, [datapt])


return(
    <div
        ref={svgRef}>
        </div>
)
}

export default LegendChart;