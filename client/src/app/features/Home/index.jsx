import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavBar/connectStore";
import Chart from "../../../components/HighChartsMap";
import ChangePassword from "../../../components/ChangePass.Form/connectStore";
import { makeStyles } from "@material-ui/core";

import "./style.scss";

const useStyles = makeStyles({
  background: (props) => {
    console.log(props);
    if (props.isFirstLogin && !props.cancel) return { opacity: 0.2 };
  },
});

export default function Home({ isFirstLogin, executor }) {
  const [mapData, setMapData] = useState({});
  const [cancel, setCancel] = useState(false);
  const classes = useStyles({ isFirstLogin, cancel });
  useEffect(() => {
    import(`../../../assets/json/RegionFile.json`)
      .then((res) => {
        setMapData(res);
      })
      .catch((err) => console.log({ err }));
  }, []);

  function handleCancel(event) {
    event.preventDefault();
    setCancel(true);
  }

  return (
    <div className="home-wrap">
      <div className={classes.background}>
        <Navbar />
        <p>Hello {executor}!</p>
        <Chart mapData={mapData} />
      </div>
      {!cancel && isFirstLogin ? (
        <ChangePassword handleCancel={handleCancel} />
      ) : null}
    </div>
  );
}
