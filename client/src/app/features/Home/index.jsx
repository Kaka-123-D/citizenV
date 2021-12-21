import React, { useEffect, useState } from "react";
import Navbar from "../../../containers/Navbar"; 
import Chart from "../../../components/HighChartsMap"

import "./home.scss";

export default function Home() {
  const [mapData, setMapData] = useState({});
  useEffect(() => {
    import(`../../../assets/json/RegionFile.json`)
      .then((res) => {
        setMapData(res);
      })
      .catch((err) => console.log({ err }));
  }, []);
  return (
    <div className="home-wrap">
      <Navbar />
      <p>Hello from Home User!</p>
      <Chart mapData={mapData}/>
    </div>
  );
}
