import React, { useEffect, useRef , useState} from 'react'
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import { Grid } from '@mui/material';
import { boxplot, boxplotStats } from 'd3-boxplot';

const boxdata = require('../utils/boxdata.json')


const Boxgraph = ({datapt}) => {
    
    const M = {L: 10, R: 3, B: 5, T: 20}

    const width = 400, height = 400;
    const W = 300;
    const H = 350
    
//    console.log(boxdata)
  
    let constructorName = []
    let pit_time = []
    let constructorId = []

    // for(let i=0; i<datapt.length; i++){

    //     constructorName.push(datapt[i].constructorName)
    //     constructorId.push(+datapt[i].constructorId)
    //     pit_time.push(datapt[i].pittime)
    // }

    d3.map(boxdata, d => constructorName.push(d.constructorName))
    d3.map(boxdata, d => pit_time.push(d.pittime))
    d3.map(boxdata, d => constructorId.push(d.constructorId))
    // console.log(pit_time)



    // console.log(constructorName)
    // console.log(constructorId)
    // console.log(pit_time)
    
    
  const datapoint = [1, 2, 3, 3.5, 3.6, 5, 6]
  const data = [[2.9, 3, 3.4, 3.5, 3.9, 5.6, 6], [2.2, 3, 3.4, 5.6, 3.6, 5, 6],[1, 2, 3, 3.5, 3.6, 5, 6],[1.2, 3.3, 3.4, 3.5, 3.6, 5, 6],[2, 3, 3.84, 3.95, 4.6, 5, 6],[1.8, 3, 3.4, 3.9, 4.4, 5, 6], [2.9, 3, 3.4, 3.5, 3.9, 5.6, 6], [2.2, 3, 3.4, 5.6, 3.6, 5, 6],[1, 2, 3, 3.5, 3.6, 5, 6],[1.2, 3.3, 3.4, 3.5, 3.6, 5, 6],[2, 3, 3.84, 3.95, 4.6, 5, 6],[1.8, 3, 3.4, 3.9, 4.4, 5, 6]]

    let constructor_color_map = {
      'Toro Rosso':'#0000FF',
      'Mercedes':'#6CD3BF',
      'Red Bull':'#1E5BC6',
      'Ferrari':'#ED1C24',
      'Williams':'#37BEDD',
      'Force India':'#FF80C7',
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
      'Haas F1 Team':'#B6BABD',
      'Racing Point':'#F596C8',
      'Aston Martin':'#2D826D',
      'Alfa Romeo':'#B12039',
      'AlphaTauri':'#4E7C9B',
      'Alpine F1 Team':'#2293D1'
  }
  
    const stats = pit_time.map(d => boxplotStats(d))
  
    console.log(constructorName)
    
    const svgref = useRef(); 


    useEffect(() => {
        
    const svg = d3.select(svgref.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])

    svg.append('g')
        .attr('class', 'plots')
    const scale = d3.scaleLinear()
        .domain([15, 45])
        .range([H, M.T+M.B])
    const band = d3.scaleBand()
        .domain(d3.range(stats.length))
        .range([M.L+M.B+10, W - M.L - M.R] )
        .paddingInner(0.3)
        .paddingOuter(0.2)

    const scale2 = d3.scaleLinear()
        .domain([15, 45])
        .range([H, M.T+M.B])
        
    const band2 = d3.scaleBand()
        .domain(constructorName)
        .range([M.L+M.B, W - M.L - M.R ])
        
    const xAxis = d3.axisBottom(band2).ticks().tickValues([]);
    const yAxis = d3.axisLeft(scale2).ticks();

    svg.select(".x-axis")
    .attr("class", "axisWhite")
    .attr("transform", `translate(${3*M.L}, ${H})`) 
    .call(xAxis)

    svg.append("text")
    .attr("class", "axisLabel")
    .attr("text-anchor", "middle")
  .attr("x", width/2) 
  .attr("y", H+20) 
  .text("Teams")

    // .selectAll("text")
    // .remove()	
    //     .style("text-anchor", "end")
    //     .attr("dx", "-.8em")
    //     .attr("dy", ".15em")
    //     .attr("transform", "rotate(-65)");
            

    svg.select(".y-axis")
    .attr("class", "axisWhite")
            .call(yAxis)
            .attr("transform", `translate(${5*M.L}, ${0})`)

    svg.append("text")
    .attr("class", "axisLabel")
    .attr("transform", "rotate(-90)")
    .attr("x", -H/2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("Pitstop duration(s)")
           

  const plot = boxplot()
    .scale(scale)
    .jitter(0.2)
    .opacity(0.8)
    .showInnerDots(false)
    .bandwidth(band.bandwidth())
    .boxwidth( band.bandwidth())
    .vertical(true)
    .key(d => d)

  svg.select('g.plots')
    .attr('transform', 'translate(' + [3*M.L, 0] + ')')
    .selectAll('.plot').data(stats)
    .join('g')
    .attr('class', 'plot')
    .attr('transform', (_, i) => `translate(${[band(i), 0] })`)
    .attr('color', (_, i) =>  constructor_color_map[constructorName[i]] )
    .call(plot)

    }, [datapt])

    
  console.log("stats",stats)


  return(
    <div>
        
        <svg ref={svgref}>
                <g className='x-axis'></g>
                <g className='y-axis'></g>
        </svg>
       
    </div>
    
);
};


export default Boxgraph;