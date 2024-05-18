const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Received Event: ', type);

  switch (type) {
    case 'CommentCreated':
      const status = data.content.includes('fuck') ? 'rejected' : 'approved';
      const event = {
        type: 'CommentModerated',
        data: {
          ...data,
          status,
        },
      };

      await axios.post('http://localhost:4005/events', event);
      break;

    default:
      break;
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on port 4003');
});
