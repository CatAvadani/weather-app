import React, { useState } from 'react';

interface SearchWeatherProps {
  onSearch: (query: string) => void;
}

export default function SearchWeatherInput({ onSearch }: SearchWeatherProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className='flex justify-center items-center '>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Enter city name'
        className='py-2 px-6 rounded-l-full text-black'
      />
      <button
        type='submit'
        className='py-2 px-6 bg-yellow-500 text-white rounded-r-full'
      >
        Get Weather
      </button>
    </form>
  );
}
