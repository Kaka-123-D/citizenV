import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./style.scss"

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
  getArrayIdLatest,
}) {
  const [checkShow1, setCheckShow1] = useState(false);
  const [checkShow2, setCheckShow2] = useState(false);
  const [checkChange1, setCheckChange1] = useState(false);
  const [checkChange2, setCheckChange2] = useState(false);
  const [isDisabled1, setIsDisabled1] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [arraySelect, setArraySelect] = useState([[], [], []]);

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
    if (executor !== "b2" && executor !== "b1" && executor !== "a3")
      getRegions(executor, "wards", ids);
  }, [checkChange2]);

  const handleSelect1 = (selected) => {
    arraySelect[0] = selected;
    setCheckChange1(!checkChange1);
    if (selected.length > 0) setCheckShow1(true);
    else setCheckShow1(false);
    setIds(
      selected.map((select) => {
        return select.value;
      })
    );
  };

  const handleSelect2 = (selected) => {
     setIds(
       selected.map((select) => {
         return select.value;
       })
     );
    arraySelect[1] = selected;

    if (selected.length > 0) {
      // disable select 1
      setIsDisabled1(true);
      setCheckShow2(true);
      setCheckChange2(!checkChange2);
    } else {
      // enable select 1
      setIsDisabled1(false);
       setIds(
         arraySelect[0].map((select) => {
           return select.value;
         })
       );
        setCheckShow2(false);
         
    }
    
  };

  const handleSelect3 = (selected) => {
    setIds(
      selected.map((select) => {
        return select.value;
      })
    );
    arraySelect[2] = selected;
    if (selected.length > 0) {
      // disable select 1
      setIsDisabled2(true);
    } else {
      // enable select 1
      setIsDisabled2(false);
      setIds(arraySelect[1].map((select) => {
        return select.value;
      }))
    }
    
  };

  return (
    <div className="select-group">
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={defaultRegions.map((region) => {
          return { value: region.id, label: region.name };
        })}
        onChange={handleSelect1}
        isDisabled={isDisabled1}
        className="select-bar select1"
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
              isDisabled={isDisabled2}
              className="select-bar select2"
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
              className="select-bar select3"
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
                  onChange={handleSelect2}
                  className="select-bar select2"
                />
              ) : null}
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
