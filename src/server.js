import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import axios from 'axios';
import Andelan from './lib/andelan';
import * as middlewares from './middlewares';
import keepDynoAwake from './lib/keepDynoAwake';

const server = express();

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.post('/slash-command',
  middlewares.validateSlashCommand,
  middlewares.extractSubCommands,
  middlewares.getUserMail,
  middlewares.getUserInfo,
  async (req, res) => {
    const { userData, userSkills } = res.locals;
    const andelan = new Andelan(userData, userSkills);
    const slackResponse = {
      text: `*_This is ${andelan.fullName}(${res.locals.userHandle}):_*`,
      attachments: [],
    };
    res.locals.subCommands.forEach((command) => {
      const attachment = andelan[command];
      if (attachment && attachment.pretext === 'Bio' && attachment.text) {
        slackResponse.attachments.push(attachment);
      }
      if (attachment && attachment.fields.length) {
        slackResponse.attachments.push(attachment);
      }
    });
    return axios.post(req.body.response_url, JSON.stringify(slackResponse));
  });

server.post('/ping', (req, res) => res.json({ message: 'I am Alive!' }).end());

const port = process.env.PORT || 8008;

server.listen(port, () => {
  console.log(`App started on port ${port}`);
  keepDynoAwake();
});
