import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import axios from 'axios';
import Andelan from './lib/andelan';
import * as middlewares from './middlewares';

const server = express();

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.post('/slash-command',
  middlewares.validateSlashCommand,
  middlewares.extractSubCommands,
  middlewares.getUserMail,
  async (req, res) => {
    let userData, userSkills;
    try {
      userData = await Andelan.getUserWithEmail(res.locals.userEmail);
      userSkills = await Andelan.getSkillsWithId(userData.id);
    } catch (error) {
      return middlewares.badResponse(req.body.response_url, ':cry: Something went wrong');
    }
    const andelan = new Andelan(userData, userSkills);
    const slackResponse = { attachments: [] };
    res.locals.subCommands.forEach(command => slackResponse.attachments.push(eval(`andelan.${command}`)));
    axios.post(req.body.response_url, JSON.stringify(slackResponse));
  }
);

server.post('/ping', (req, res) => res.json({ message: 'I am Alive!'}).end());

const port = 8008;

server.listen(port, () => {
  console.log(`App started on port ${port}`);
});
