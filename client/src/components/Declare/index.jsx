import React, { useState, useEffect } from "react";

export default function Declare({
  regions,
  setRegionListToState,
  declareRegion,
  declarer,
}) {
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //   useEffect(() => {
  //       setRegionListToState(declarer);
  //   })
  function handleSubmit(event) {
    event.preventDefault();
    declareRegion(id, name, description, declarer);
    // setRegionListToState(declarer);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(event) => setID(event.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button>Ok</button>
      </form>

      <select onClick={() => setRegionListToState(declarer)}>
        <option> -- </option>
        {regions.map((region, index) => (
          <option key={region.provinceId} value={region.provinceId}>
            {region.provinceName}
          </option>
        ))}
      </select>
    </>
  );
}
