import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import React, { useState, useEffect } from "react";
import LineChart from "./components/LineChart";

const App = () => {

  const [data, setData] = useState();
  const csvUrl = "https://gist.githubusercontent.com/SimrnGupta/656df80380d93af3d5803a74d0d707ae/raw/constructors_positions.csv"

  useEffect(() => {
    d3.csv(csvUrl).then(data => {
      setData(data)
      console.log(data)
  });
  }, [])
  return (
    <div className="App">
        {data && <LineChart data={data}/>}
    </div>
  );
}

export default App;
