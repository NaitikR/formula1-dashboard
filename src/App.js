import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import React, { useState, useEffect } from "react";
import LineChart from "./components/LineChart";
import Sankeyplot from "./components/Sankey";
import PcpPlot from "./components/PcpPlot";
import Boxgraph from "./components/Boxplot";
import Piechartplot from "./components/PieChartPlot";
import LegendChart from "./components/Legend"
import { Button } from "@mui/material";
import AutorenewIcon  from "@mui/icons-material/Autorenew";
import diamond from "./utils/formula-1-logo-0.png"  ;

const App = () => {

  const [data, setData] = useState();
  const [pcpdata, setPcpData] = useState();
  const [driverPie, setDriverPie] = useState();
  const [conPie, setConPie] = useState();
  const [boxData, setBoxData] = useState();
  const [driverData, setDriverData] = useState();
  const [teamLine, setTeamLine] = useState([]);

  const [selectedDriver, setDriver] = useState("");

  const linkDriverNationality = (value) => {
    // console.log(value)
    setDriver(value);
  }

  const linkTeamLineChart = (value) => {
    setTeamLine(current => [...current, value])
  }
  // console.log(teamLine)
  const csvUrl = "https://gist.githubusercontent.com/NaitikR/dd1b640612c58836026f12b7c8f21b4e/raw/5c47b9e1d639a053f2c4bf326e0021c54865ee5c/linechartfinal.csv"
  // const csvUrl = "https://gist.githubusercontent.com/SimrnGupta/656df80380d93af3d5803a74d0d707ae/raw/constructors_positions.csv"
  const csvUrl2 = "https://gist.githubusercontent.com/SimrnGupta/6e0e8a7be7ec520185a7739e170312c5/raw/pcpdatanew.csv"
  // const drivpieurl = "https://gist.githubusercontent.com/NaitikR/395312d800ae4f8385a7df0998ff6b3f/raw/1eacfaeb98d8c0b16aab8e84847b7bd5df9889af/nation.csv"
  const conspieurl = "https://gist.githubusercontent.com/NaitikR/666d0a723aada2b63771e894b6b21ccf/raw/5a7372c612f176b7e540178fe4968d0b21f1c894/cons_nation.csv"
  const piturl ="https://gist.githubusercontent.com/NaitikR/06c04863cd1d6d9a095866e58e1bd0f5/raw/0e943dd6d33be5b29d2dbac50dd338adcb2a64e7/pit_time.csv"  
  const driver_name_url = "https://gist.githubusercontent.com/SimrnGupta/c03f2a27daeadfec774bd2e4f0acb556/raw/driver_constructors.csv"
  const drivpieurl = "https://gist.githubusercontent.com/NaitikR/0bfbe34014622849714dc03d72010bcb/raw/735cd577803e0369d37752dd37f0981984dc8863/newnationfinal.csv"


  const resetStates = () => {
    setDriver("");
    setTeamLine([]);
  }

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
    d3.csv(driver_name_url).then(data => setDriverData(data))
  }, [teamLine])
  return (
    <div className="App">

      <div id="header"> <div id="logodiv"> <img src={diamond} height={"100%"} width={"100%"}/> </div> Formula 1 : The Pit Wall

      <Button 
      
      style={{backgroundColor: "#eeeeee", color:"black", marginRight:20}}
      variant="contained" //"outlined" 
      startIcon={<AutorenewIcon />}
       onClick={() => {
        resetStates()
       }}>
        Reset
        </Button>
      </div>

      <div className="parent">
        <div class="div1"> 
          <Sankeyplot 
            linkDriverNationality={linkDriverNationality}
            linkTeamLineChart={linkTeamLineChart}
            teamLine={teamLine}
            setTeamLine={setTeamLine}
          /> 
        </div>
        {/* <div class="div2"> {conPie && <Piechartplot MdsData={conPie}/>} </div> */}
        <div className="div3"> {driverPie && driverData && 
          <Piechartplot 
            MdsData={driverPie} 
            driverData={driverData}
            selectedDriver={selectedDriver}
          />} 
        </div>
        <div className="div2"> {boxData &&  
          <Boxgraph 
            datapt={boxData}
            teamLine={teamLine}
          /> } 
        </div>
        <div className="div4"> {data && <LineChart data={data} teamLine={teamLine}/>} </div>
        <div className="div5"> {pcpdata && 
          <PcpPlot 
            data={pcpdata}
            teamLine={teamLine}
          />} 
        </div>
        <div className="div6"> {boxData && <LegendChart datapt={boxData}/> }</div>
      </div>
    </div>
  );
}

export default App;

// {driverPie && <Piechartplot MdsData={driverPie}/>}