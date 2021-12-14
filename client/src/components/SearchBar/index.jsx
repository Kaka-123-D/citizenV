import React, { useState, useEffect } from "react";
import "./searchBar.scss";

export default function index({ regions, setRegionListToState, executor }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    setRegionListToState(executor);
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
        {Array.isArray(regions) && regions.length == 0
          ? null
          : regions.map((region) => (
              <option key={region.id}>{region.name}</option>
            ))}
      </datalist>
    </div>
  );
}
