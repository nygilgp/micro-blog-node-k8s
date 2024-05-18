import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');
  const url = `http://posts.com/posts/${postId}/comments`;
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(url, {
      content,
    });
    setContent('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor={`comment-${postId}`}>New Comment</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id={`comment-${postId}`}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
