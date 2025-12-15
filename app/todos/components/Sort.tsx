"use client";

import { useState } from "react";

const Sort = () => {
  const [sortType, setSortType] = useState("id");

  return (
    <select
      value={sortType}
      onChange={(e) => setSortType(e.target.value)}
    >
      <option value="id">id順</option>
      <option value="name">名前順</option>
    </select>
  );
};

export default Sort;
