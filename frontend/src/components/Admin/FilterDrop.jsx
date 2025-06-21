import React from "react";

const FilterDropdown = ({ options, value, onChange }) => (
  <select
    className="border border-gray-300 rounded px-3 py-2 text-sm"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    {options.map((option, i) => (
      <option key={i} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default FilterDropdown;
