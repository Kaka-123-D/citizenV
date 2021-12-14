import React, {useState} from 'react';
import SearchBar from '../../containers/SearchBar'

export default function forA2toB2({ createAccount, executor }) {
  const [id, setId] = useState("");
  return (
    <div>
      <input
        type="text"
        value={id}
        placeholder="type a ID..."
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={() => createAccount(executor, id, "", "", "", "", "")}>
        Create
      </button>
    </div>
  );
}
