import React, { useState, useEffect } from "react";
import "./style.scss";

export default function index({ regions, setRegionToShowListPerson }) {
  const [input, setInput] = useState("");

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
