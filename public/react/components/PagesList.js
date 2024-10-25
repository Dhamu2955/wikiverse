import React from 'react';

export const PagesList = ({ pages, onPageClick, onDelete }) => {
  return (
    <div>
      {pages.map((page) => (
        <div key={page.slug}>
          <p onClick={() => onPageClick(page.slug)}>
            {page.title}
          </p>
          <button onClick={() => onDelete(page.slug)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
