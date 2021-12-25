import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function RegionSelect({
  executor,
  setIds,
  defaultRegions,
  getRegions,
  ids,
  districts,
  wards,
  setRegionListToState,
}) {
  const [checkShow1, setCheckShow1] = useState(false);
  const [checkShow2, setCheckShow2] = useState(false);
  const [checkChange1, setCheckChange1] = useState(false);
  const [checkChange2, setCheckChange2] = useState(false)

  useEffect(() => {
    setRegionListToState(executor);
  }, []);

  useEffect(() => {
    if (executor === "a1") {
      getRegions(executor, "districts", ids);
    } else if (executor === "a2") {
      getRegions(executor, "wards", ids);
    }
  }, [checkChange1]);

  useEffect(() => {
    if (executor !== "b2") getRegions(executor, "wards", ids);
  }, [checkChange2]);

  const handleSelect1 = (selected) => {
    setCheckChange1(!checkChange1);
    if (selected) setCheckShow1(true);
    else setCheckShow1(false);
    setIds(
      selected.map((select) => {
        return select.value;
      })
    );
  };

  const handleSelect2 = (selected) => {
      setCheckChange2(!checkChange2);
    if (selected) setCheckShow2(true);
    else setCheckShow2(false);
    setIds(
      selected.map((select) => {
        return select.value;
      })
    );
  };

  const handleSelect3 = (selected) => {
    setIds(
      selected.map((select) => {
        return select.value;
      })
    );
  };

  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={defaultRegions.map((region) => {
          return { value: region.id, label: region.name };
        })}
        onChange={handleSelect1}
      />
      {executor === "a1" ? (
        <>
          {checkShow1 ? (
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={districts.map((region) => {
                return { value: region.id, label: region.name };
              })}
              onChange={handleSelect2}
            />
          ) : null}
          {checkShow2 ? (
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={wards.map((region) => {
                return { value: region.id, label: region.name };
              })}
              onChange={handleSelect3}
            />
          ) : null}
        </>
      ) : (
        <>
          {executor === "a2" ? (
            <>
              {checkShow1 ? (
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={wards.map((region) => {
                    return { value: region.id, label: region.name };
                  })}
                  onChange={handleSelect3}
                />
              ) : null}
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
