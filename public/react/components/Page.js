import React from 'react';

export const Page = (props) => {
  const { page, onBack, onDelete } = props;

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://your-api-url.com/wiki/${page.slug}`, {
        method: "DELETE",
      });
    
      if (!response.ok) {
        throw new Error('Failed to delete the page');
      }

      await fetchPages(); 
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  return (
    <div>
      <h3>{page.title}</h3>
      {onBack && (
        <>
          <p><strong>Author:</strong> {page.author.name}</p>
          <p><strong>Content:</strong> {page.content}</p>
          <p><strong>Tags:</strong> {page.tags.map(tag => tag.name).join(', ')}</p>
          <p><strong>Date Created:</strong> {new Date(page.createdAt).toLocaleDateString()}</p>
          <button onClick={onBack}>Back to Wiki List</button>
          <button onClick={handleDelete}>Delete Page</button>
        </>
      )}
    </div>
  );
};
