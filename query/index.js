const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case 'PostCreated':
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    case 'CommentCreated':
      const { id: commentId, content, postId, status } = data;
      posts[postId].comments.push({ id: commentId, content, status });
      break;
    case 'CommentUpdated': {
      const { id: commentId, postId, status, content } = data;
      const post = posts[postId];
      const comment = post.comments.find((comment) => comment.id === commentId);
      comment.status = status;
      comment.content = content;
      break;
    }

    default:
      break;
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on port 4002');
});
