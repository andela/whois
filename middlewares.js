import axios from 'axios';
import dotEnv from 'dotenv';

dotEnv.config();

const slackToken = process.env.SLACK_TOKEN;

export const validateSlashCommand = (req, res, next) => {
  // @TODO: Also veirfy that the slash command is comming form the intended slack workspace
  const { text } = req.body;
  if (!text) {
    return res
      .json({ 'response_type': 'ephemeral', 'text': 'You are not using the command correcty' })
      .status(200)
      .end();
  }
  const userIdMatch = text.match(/^.*?<@(.+?)\|.*?>.*$/);
  const userId = userIdMatch ? userIdMatch[1] : null;
  if (!userId) {
    return res
      .json({ 'response_type': 'ephemeral', 'text': 'You are not using the command correcty' })
      .status(200)
      .end();
  }
  res.locals.userId = userId;
  res.json({ 'response_type': 'ephemeral', 'text': 'Fetching' }).status(200).end();
  next();
}

export const extractSubCommands = (req, res, next) => {
  const { text } = req.body;
  const possilbeSubCommands = ['profile', 'bio', 'skills', 'placement'];
  let subCommands = [];
  possilbeSubCommands.forEach(command => new RegExp(`\\b${command}\\b`, 'i').test(text) && subCommands.push(command));
  if (!subCommands.length) {
    subCommands = possilbeSubCommands;
  }
  res.locals.subCommands = subCommands;
  next();
}

export const getUserMail = async (req, res, next) => {
  const { response_url } = req.body;
  await axios
    .get(`https://slack.com/api/users.info?token=${slackToken}&user=${res.locals.userId}`)
    .then((slackRes) => {
      if (!slackRes.data.ok) {
        return badResponse(response_url, ':cry: Something went wrong.');
      }
      const { user: { profile: { email } } } = slackRes.data;
      res.locals.userEmail = email;
      next();
    })
    .catch((err) => {
      return badResponse(response_url, ':cry: Something went wrong.');
    });
}

export const badResponse = (responseUrl, message = '') => {
  return axios.post(responseUrl, JSON.stringify({ text: message }));
}
