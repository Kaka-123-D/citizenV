import React, { useEffect, useState } from "react";
import Chart from "../../../components/HighChartsMap";
import "./style.scss";

export default function Home({ isFirstLogin, skipChangePass, skip}) {
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
        <Chart mapData={mapData} />
    </div>
  );
}
