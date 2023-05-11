import React, { useEffect, useRef , useState} from 'react'
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import { Grid } from '@mui/material';
import { sankey as d3Sankey } from 'd3-sankey';
const energy = require('../utils/f1_energy.json')

const Sankeyplot = () => {

    const svgref = useRef(); 
    let sankey = d3Sankey();


    useEffect(() => {
        SankeyChart({
            links: energy
        }, {
          nodeGroup: d => d.id.split(/\W/)[0], // take first word for color
          format: (f => d => `${f(d)} points`)(d3.format(",.1~f")),
          width:500,
          height: window.innerHeight - 60
          })    
    }, [])

function SankeyChart({
    nodes, // an iterable of node objects (typically [{id}, …]); implied by links if missing
    links // an iterable of link objects (typically [{source, target}, …])
  }, {
    format = ",", // a function or format specifier for values in titles
    align = "justify", // convenience shorthand for nodeAlign
    nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
    nodeGroup, // given d in nodes, returns an (ordinal) value for color
    nodeGroups, // an array of ordinal values representing the node groups
    nodeLabel, // given d in (computed) nodes, text to label the associated rect
    nodeTitle = d => `${d.id}\n${format(d.value)}`, // given d in (computed) nodes, hover text
    nodeAlign = align, // Sankey node alignment strategy: left, right, justify, center
    nodeWidth = 20, // width of node rects
    nodePadding = 3, // vertical separation between adjacent nodes
    nodeLabelPadding = 10, // horizontal separation between node and label
    nodeStroke = "currentColor", // stroke around node rects
    nodeStrokeWidth , // width of stroke around node rects, in pixels
    nodeStrokeOpacity, // opacity of stroke around node rects
    nodeStrokeLinejoin, // line join for stroke around node rects
    linkSource = ({source}) => source, // given d in links, returns a node identifier string
    linkTarget = ({target}) => target, // given d in links, returns a node identifier string
    linkValue = ({value}) => 20 + Math.sqrt(value), //value, // given d in links, returns the quantitative value
    linkPath = d3.linkHorizontal(), // given d in (computed) links, returns the SVG path
    linkTitle = d => `${d.source.id} → ${d.target.id}\n${format(d.value)}`, // given d in (computed) links
    linkColor = "source-target", // source, target, source-target, or static color
    linkStrokeOpacity = 1, // link stroke opacity
    linkMixBlendMode = "screen",//"multiply", // link blending mode
    colors = d3.schemeTableau10, // array of colors
    width = 500, // outer width, in pixels
    height, // outer height, in pixels
    marginTop = 5, // top margin, in pixels
    marginRight = 10, // right margin, in pixels
    marginBottom = 0, // bottom margin, in pixels
    marginLeft = 5, // left margin, in pixels
  } = {}) {
    // Convert nodeAlign from a name to a function (since d3-sankey is not part of core d3).
    if (typeof nodeAlign !== "function") nodeAlign = {
      left: d3.sankeyLeft,
      right: d3.sankeyRight,
      center: d3.sankeyCenter
    }[nodeAlign] ?? d3.sankeyJustify;

    function horizontalSource(d) {
      return [d.source.x1, d.y0];
    }
    
    function horizontalTarget(d) {
      return [d.target.x0, d.y1];
    }

    const sankeyLink = () => {
      return d3.linkHorizontal()
          .source(horizontalSource)
          .target(horizontalTarget);
    }
    // Compute values.
    const LS = d3.map(links, linkSource).map(intern);
    const LT = d3.map(links, linkTarget).map(intern);
    const LV = d3.map(links, linkValue);
    if (nodes === undefined) nodes = Array.from(d3.union(LS, LT), id => ({id}));
    const N = d3.map(nodes, nodeId).map(intern); // d3.map(nodes, d => d.id)
    const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
  
    // Replace the input nodes and links with mutable objects for the simulation.
    nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
    links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i], value: LV[i]}));

    // console.log("links", links)    

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
  
    // Ignore a group-based linkColor option if no groups are specified.
    if (!G && ["source", "target", "source-target"].includes(linkColor)) linkColor = "currentColor";
  
    // Compute default domains.
    if (G && nodeGroups === undefined) nodeGroups = G;

  
    // Construct the scales.
    const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

    // console.log(G)
    // console.log(linkColor)
  
    let linksort = (a, b) => {
      if(a.value > b.value) return -1;
      return 1;
    }
    // Compute the Sankey layout.
    let test = sankey.nodeId((d,i) => N[i])
        // .nodeAlign(align)
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .nodeSort(linksort)
        .extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]])
      ({nodes, links});

    // // Compute titles and labels using layout nodes, so as to access aggregate values.
    if (typeof format !== "function") format = d3.format(format);
    const Tl = nodeLabel === undefined ? N : nodeLabel == null ? null : d3.map(nodes, nodeLabel);
    const Tt = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
    const Lt = linkTitle == null ? null : d3.map(links, linkTitle);

    // // A unique identifier for clip paths (to avoid conflicts).
    const uid = `O-${Math.random().toString(16).slice(2)}`;
    const svg = d3.select(svgref.current);

    svg.attr("width", width)
        .attr("height", height+200)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: 1200;") //height: auto; height: intrinsic;");
        .style("height", height)

    const node = svg.append("g")
        .attr("stroke", nodeStroke)
        .attr("stroke-width", nodeStrokeWidth)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-linejoin", nodeStrokeLinejoin)
      .selectAll("rect")
      .data(nodes)
      .join("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
  
      if (G) node.attr("fill", ({index: i}) => constructor_color_map[G[i]]? constructor_color_map[G[i]] : "#9e9e9e");
      if (Tt) node.append("title").text(({index: i}) => Tt[i]);
  
    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", linkStrokeOpacity)
      .selectAll("g")
      .data(links)
      .join("g")
        .style("mix-blend-mode", linkMixBlendMode);
  
    link.append("path")
    .attr("d", sankeyLink())
    .attr("stroke", ({target: {index: i}}) => constructor_color_map[G[i]])
        
    .attr("opacity", 1)
    .attr("stroke-width", ({width}) => Math.max(1, width))
    .call(Lt ? path => path.append("title").text(({index: i}) => Lt[i]) : () => {});
    
    if (Tl) svg.append("g")
        .attr("font-family", "'Montserrat', sans-serif")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        
      .selectAll("text")
      .data(nodes)
      .join("text")
        .attr("x", d => d.x0 < width / 2 ? d.x1 + nodeLabelPadding : d.x0 - nodeLabelPadding)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .attr("fill", "#fff")
        .text(({index: i}) => Tl[i]);
  
    function intern(value) {
      return value !== null && typeof value === "object" ? value.valueOf() : value;
    }
  
  }
    
    return(
        <div id='sankey'>
            {/* <Grid container spacing={1}>
                <Grid item xs={5}> */}
                <svg ref={svgref}>

                </svg>
              {/* </Grid>
            </Grid>
             */}
        </div>
        
    );
};


export default Sankeyplot;