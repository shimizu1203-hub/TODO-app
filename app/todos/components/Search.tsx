"use client";

type Props = {
  searchText: string;
  setSearchText: (value: string) => void;
};

export default function Search({ searchText, setSearchText }: Props) {
  return (
    <input
      type="text"
      placeholder="タイトルで検索"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
}
