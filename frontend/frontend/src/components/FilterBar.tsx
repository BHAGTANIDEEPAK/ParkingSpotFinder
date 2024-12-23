import React from 'react';
import { FC, useState } from 'react';

interface FilterBarProps {
  onFilter: (query: string) => void;
}

const FilterBar: FC<FilterBarProps> = ({ onFilter }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search parking spots..."
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 border rounded shadow"
      />
    </div>
  );
};

export default FilterBar;
