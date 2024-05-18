import React, { useState } from 'react';
import axios from 'axios';
import { PostList } from './PostList';

export const PostCreate = () => {
  const [title, setTitle] = useState('');
  const url = 'http://posts.com/posts/create';
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(url, {
      title,
    });
    setTitle('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="post-title">Title</label>
          <input
            value={title}
            type="text"
            id="post-title"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      <hr />
      <PostList />
    </div>
  );
};
