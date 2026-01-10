import { useState } from "react";
interface FilterProps {
  setFilter: (value: string) => void;
}
export const Filter = ({ setFilter }: FilterProps) => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div>
      <select
        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={activeTab}
        onChange={(e) => {
          setActiveTab(e.target.value);
          setFilter(e.target.value);
        }}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};
