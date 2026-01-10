import { useState } from "react";
interface FilterProps {
  setFilter: (value: string) => void;
}
export const Filter = ({ setFilter }: FilterProps) => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div>
      <select
        className="w-full mb-2 px-4 py-2 bg-task-background border border-gray-300 rounded-lg focus:outline-none cursor-pointer"
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
