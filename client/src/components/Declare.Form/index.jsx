import React, { useState, useEffect } from "react";

export default function Declare({ declareRegion, executor }) {
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    declareRegion(executor, id, name, description);
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
    </>
  );
}
