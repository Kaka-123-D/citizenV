import React, { useEffect, useState } from "react";
import Chart from "../../../components/HighChartsMap/connectStore";
import "./style.scss";

export default function Home({executor}) {
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
        {executor === "a1" ? <Chart mapData={mapData} /> : null}
    </div>
  );
}
