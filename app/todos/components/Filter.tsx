"use client";

type FilterValue = "all" | "notStarted" | "inProgress" | "done";

type Props = {
  filter: FilterValue;
  setFilter: (value: FilterValue) => void;
};

const filterOptions = [
  { value: "all", label: "すべて" },
  { value: "notStarted", label: "未着手" },
  { value: "inProgress", label: "進行中" },
  { value: "done", label: "完了" },
];

const Filter = ({ filter, setFilter }: Props) => {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value as FilterValue)}
    >
      {filterOptions.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Filter;
