import React, { useState, useEffect } from "react";

export default function DeclareForm({ declareRegion, executor }) {
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("tỉnh");

  function handleSubmit(event) {
    event.preventDefault();
    declareRegion(executor, id, type, name, description);
    setID("");
    setName("");
    setDescription("");
  }

  function renderSwitch(executor) {
    switch (executor) {
      case "a1":
        return ["Tỉnh", "Thành phố"];
      case "a2":
        return ["Huyện", "Quận", "Thành phố"];
      case "a3":
        return ["Xã", "Phường", "Thị trấn"];
      case "b1":
        return ["Thôn", "Bản", "Tổ dân phố", "Xóm"];
      default:
        return ["error"];
    }
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
        <select>
          {renderSwitch(executor).map((item) => {
            return (
              <option
                key={item}
                value={item.toLocaleLowerCase()}
                onChange={(e) => setType(e.target.value)}
              >
                {item}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="Name Region"
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
