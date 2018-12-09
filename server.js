import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotEnv from 'dotenv';
import axios from 'axios';

dotEnv.config();

const server = express();
const slackToken = process.env.SLACK_TOKEN;

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.post('/', async (req, res) => {

  const { text, response_url } = req.body;

  if (!text) {
    return res
      .json({ "response_type": "ephemeral", "text": "You are not using the command correcty" })
      .status(200)
      .end();
  }
  const userIdMatch = text.match(/^.*?<@(.+?)\|.*?>.*$/);
  const userId = userIdMatch ? userIdMatch[1] : null;
  if (!userId) {
    return res
      .json({ "response_type": "ephemeral", "text": "You are not using the command correcty" })
      .status(200)
      .end();
  }
  res.json({ "response_type": "ephemeral", "text": "I am still in development process" }).status(200).end();
});

const port = 8888;

server.listen(port, () => {
  console.log(`App started on port ${port}`);
});
