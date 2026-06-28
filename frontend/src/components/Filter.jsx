import React from 'react';

function Filter({ filter, sort, onFilterChange, onSortChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__group">
        {['all', 'completed', 'pending'].map(f => (
          <button
            key={f}
            className={`filter-bar__btn ${filter === f ? 'filter-bar__btn--active' : ''}`}
            onClick={() => onFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="filter-bar__group">
        {[['newest', 'Newest'], ['oldest', 'Oldest'], ['title', 'A–Z']].map(([val, label]) => (
          <button
            key={val}
            className={`filter-bar__btn ${sort === val ? 'filter-bar__btn--active' : ''}`}
            onClick={() => onSortChange(val)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filter;
