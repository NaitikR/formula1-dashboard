import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import React, { useState, useEffect } from "react";
import LineChart from "./components/LineChart";
import Sankeyplot from "./components/Sankey";
import PcpPlot from "./components/PcpPlot";
import Boxgraph from "./components/Boxplot";
import Piechartplot from "./components/PieChartPlot";

const App = () => {

  const [data, setData] = useState();
  const [pcpdata, setPcpData] = useState();
  const [driverPie, setDriverPie] = useState();
  const [conPie, setConPie] = useState();
  const [boxData, setBoxData] = useState();

  const csvUrl = "https://gist.githubusercontent.com/SimrnGupta/656df80380d93af3d5803a74d0d707ae/raw/constructors_positions.csv"
  const csvUrl2 = "https://gist.githubusercontent.com/SimrnGupta/6e0e8a7be7ec520185a7739e170312c5/raw/pcpdatanew.csv"
  const drivpieurl = "https://gist.githubusercontent.com/NaitikR/395312d800ae4f8385a7df0998ff6b3f/raw/1eacfaeb98d8c0b16aab8e84847b7bd5df9889af/nation.csv"
  const conspieurl = "https://gist.githubusercontent.com/NaitikR/666d0a723aada2b63771e894b6b21ccf/raw/5a7372c612f176b7e540178fe4968d0b21f1c894/cons_nation.csv"
  const piturl ="https://gist.githubusercontent.com/NaitikR/06c04863cd1d6d9a095866e58e1bd0f5/raw/0e943dd6d33be5b29d2dbac50dd338adcb2a64e7/pit_time.csv"  

  useEffect(() => {
    d3.csv(csvUrl).then(data => {
      setData(data)
  });

  d3.csv(csvUrl2).then(data => {
    setPcpData(data)
});

    d3.csv(drivpieurl).then(data => setDriverPie(data))
    d3.csv(conspieurl).then(data => setConPie(data))
    d3.csv(piturl).then(data => setBoxData(data))
  }, [])
  return (
    <div className="App">
      <div id="header">Formula 1 : The Pit Wall</div>
      <div class="parent">
        <div class="div1"> <Sankeyplot/> </div>
        <div class="div2"> {pcpdata && <PcpPlot data={pcpdata}/>} </div>
        <div class="div3"> {conPie && <Piechartplot MdsData={conPie}/>} </div>
        <div class="div4"> {driverPie && <Piechartplot MdsData={driverPie}/>}  </div>
        <div class="div5"> {data && <LineChart data={data}/>} </div>
        <div class="div6"> {boxData &&  <Boxgraph datapt={boxData}/> } </div>
        <div class="div7"> </div> 
      </div>
    </div>
  );
}

export default App;
