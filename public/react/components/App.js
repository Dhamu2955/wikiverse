import React, { useEffect, useState } from 'react';
import { PagesList } from './PagesList';
import { Page } from './Page';

import apiURL from '../api';

export const App = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    name: '',
    email: '',
    tags: ''
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log('Oh no an error! ', err);
    }
  };

  const fetchPage = async (slug) => {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`);
      const pageData = await response.json();
      setSelectedPage(pageData);
    } catch (err) {
      console.log('Error fetching page: ', err);
    }
  };

  const handleBackToList = () => {
    setSelectedPage(null);
  };

  const handleAddArticleToggle = () => {
    setIsAddingArticle(!isAddingArticle);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArticle)
      });
      await response.json();
      setNewArticle({ title: '', content: '', name: '', email: '', tags: '' });
      setIsAddingArticle(false);
      fetchPages(); // Refresh the pages after adding
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  const handleDeletePage = async (slug) => {
    try {
      await fetch(`${apiURL}/wiki/${slug}`, {
        method: 'DELETE',
      });
      fetchPages(); // Refresh the list of pages after deletion
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting :books:</h2>
      {selectedPage ? (
        <Page page={selectedPage} onBack={handleBackToList} />
      ) : (
        <>
          <button onClick={handleAddArticleToggle}>
            {isAddingArticle ? 'Cancel' : 'Add Page'}
          </button>
          {isAddingArticle && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={newArticle.title}
                onChange={handleInputChange}
                placeholder="Title"
                required
              />
              <textarea
                name="content"
                value={newArticle.content}
                onChange={handleInputChange}
                placeholder="Content"
                required
              />
              <input
                type="text"
                name="name"
                value={newArticle.name}
                onChange={handleInputChange}
                placeholder="Author Name"
                required
              />
              <input
                type="email"
                name="email"
                value={newArticle.email}
                onChange={handleInputChange}
                placeholder="Author Email"
                required
              />
              <input
                type="text"
                name="tags"
                value={newArticle.tags}
                onChange={handleInputChange}
                placeholder="Tags (space-separated)"
              />
              <button type="submit">Submit</button>
            </form>
          )}
          <PagesList pages={pages} onPageClick={fetchPage} onDelete={handleDeletePage} />
        </>
      )}
    </main>
  );
};
