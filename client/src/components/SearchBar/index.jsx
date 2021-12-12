import React, { useState, useEffect } from "react";
import "./searchBar.scss";

export default function index({ regions, setRegionListToState }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    setRegionListToState("a1");
  }, []);

  return (
    <div className="searchBar">
      <input
        list="regions"
        type="text"
        placeholder="Type to search.."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <datalist id="regions">
        {regions.map((region) => (
          <option key={region.provinceId}>{region.provinceName}</option>
        ))}
      </datalist>
    </div>
  );
}
