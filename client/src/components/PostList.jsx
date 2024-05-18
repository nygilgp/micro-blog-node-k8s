import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CommentCreate } from './CommentCreate';
import { CommentList } from './CommentList';

export const PostList = () => {
  const [posts, setposts] = useState({});
  const url = 'http://localhost:4002/posts';
  useEffect(() => {
    (async () => {
      const response = await axios.get(url);
      setposts(response.data);
    })();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      key={post.id}
      className="card"
      style={{ width: '30%', marginBottom: '20px' }}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <hr />
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ));

  return (
    <>
      <h1>Posts</h1>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {posts && renderedPosts}
      </div>
    </>
  );
};
