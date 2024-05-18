const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const postId = req.params.id;
  comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content, status: 'pending' });
  commentsByPostId[postId] = comments;
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId,
      status: 'pending',
    },
  });
  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Received Event: ', type);

  switch (type) {
    case 'CommentModerated':
      const { id: commentId, postId, status } = data;
      const comments = commentsByPostId[postId];
      const comment = comments.find((comment) => comment.id === commentId);
      comment.status = status;
      const event = {
        type: 'CommentUpdated',
        data: {
          ...data,
        },
      };
      await axios.post('http://event-bus-srv:4005/events', event);
      break;

    default:
      break;
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on port 4001');
});
