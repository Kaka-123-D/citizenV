import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { cloneDeep } from "lodash";
import { xoa_dau } from "../../validation";

// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
  chart: {
    height: "500",
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, "#b4f8a4"],
      [0.4, "#7dda68"],
      [0.6, "#49aa33"],
      [0.8, "#1f740d"],
      [1, "#105201"],
    ],
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [
    {
      name: "Dân số",
      joinBy: ["hc-key", "key"],
    },
  ],
};

const HighMaps = ({ mapData, regions, setRegionListToState, executor }) => {
  const [options, setOptions] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    setRegionListToState(executor);
  }, []);

  useEffect(() => {
    if (mapData && regions && Object.keys(mapData).length) {
      const dataMap = [];
      for (const f of mapData.features) {
        for (const r of regions) {
          if (
            xoa_dau(r.name).toLocaleLowerCase() ===
            xoa_dau(f.properties.name).toLocaleLowerCase()
          ) {
            dataMap.push({
              key: f.properties["hc-key"],
              value: r.amountPerson,
            });
          }
        }
      }

      // const dataMap = mapData.features.map((feature, index) => ({
      //   key: feature.properties["hc-key"],
      //   value: regions
      // }));

      setOptions(() => ({
        ...initOptions,
        title: {
          text: mapData.title,
        },
        series: [{ ...initOptions.series[0], mapData: mapData, data: dataMap }],
      }));

      if (!mapLoaded) setMapLoaded(true);
    }
  }, [mapData, mapLoaded, regions]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      });
    }
  }, [options, mapData, regions]);

  if (!mapLoaded) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={cloneDeep(options)}
      constructorType={"mapChart"}
      ref={chartRef}
    />
  );
};

HighMaps.defaultProps = {
  mapData: {},
};

export default React.memo(HighMaps);
