"use client";

type Props = {
  sortType: "id" | "name";
  setSortType: (value: "id" | "name") => void;
};

const Sort = ({ sortType, setSortType }: Props) => {
  return (
    <select
      value={sortType}
      onChange={(e) => setSortType(e.target.value as "id" | "name")}
    >
      <option value="id">id順</option>
      <option value="name">名前順</option>
    </select>
  );
};

export default Sort;
