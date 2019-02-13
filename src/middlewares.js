import axios from 'axios';
import dotEnv from 'dotenv';
import Andelan from './lib/andelan';

dotEnv.config();

const slackToken = process.env.SLACK_TOKEN;

const response = {
  incorrectCommand: `
You are not using the command correcty.
Try \`/whois help\` to see the list of commands
`.trim(),

  help: `
*Available commands*
\`/whois [handle]\`
_Get full details of an Andelan_

\`/whois [handle] profile\`
_Get the profile of an Andelan_

\`/whois [handle] bio\`
_Get the bio of an Andelan_

\`/whois [handle] skills\`
_Get the skills of an Andelan(fellow)_

\`/whois [handle] placement\`
_Get the placement details of an Andelan(fellow)_

`.trim(),
};

export const badResponse = (responseUrl, message = '') => (
  axios.post(responseUrl, JSON.stringify({ text: message }))
);

export const validateSlashCommand = (req, res, next) => {
  const { text } = req.body;
  // send back the list of commands
  if (text === 'help' || (typeof text === 'string' && !text.trim())) {
    return res
      .json({ response_type: 'ephemeral', text: response.help })
      .status(200)
      .end();
  }

  const userMatch = text.match(/^.*?(<@(.+?)\|.*?>).*$/);
  const userHandle = userMatch ? userMatch[1] : null;
  const userId = userMatch ? userMatch[2] : null;
  if (!userId) {
    return res
      .json({ response_type: 'ephemeral', text: response.incorrectCommand })
      .status(200)
      .end();
  }
  res.locals.userId = userId;
  res.locals.userHandle = userHandle;
  res.json({ response_type: 'ephemeral', text: `Gathering ${userHandle} data. This might take some seconds.` }).status(200).end();
  return next();
};

export const extractSubCommands = (req, res, next) => {
  const { text } = req.body;
  const possilbeSubCommands = ['profile', 'bio', 'skills', 'placement'];
  let subCommands = [];
  possilbeSubCommands.forEach(command => new RegExp(`\\b${command}\\b`, 'i').test(text) && subCommands.push(command));
  if (!subCommands.length) {
    subCommands = possilbeSubCommands;
  }
  res.locals.subCommands = subCommands;
  return next();
};

export const getUserMail = async (req, res, next) => {
  const { response_url: responseUrl } = req.body;
  await axios
    .get(`https://slack.com/api/users.info?token=${slackToken}&user=${res.locals.userId}`)
    .then((slackRes) => {
      if (!slackRes.data.ok) {
        return badResponse(responseUrl, ':cry: Something went wrong.');
      }
      const { user: { profile: { email } } } = slackRes.data;
      res.locals.userEmail = email;
      return next();
    })
    .catch(() => badResponse(responseUrl, ':cry: Something went wrong..'));
};

export const getUserInfo = async (req, res, next) => {
  let userData;
  let userSkills;
  try {
    userData = await Andelan.getUserWithEmail(res.locals.userEmail);
    if (!userData) {
      return badResponse(
        req.body.response_url,
        'Sorry :disappointed:, this user does not have a profile on AIS.',
      );
    }
    if (Andelan.isFellow(userData.roles)) {
      userSkills = await Andelan.getSkillsWithId(userData.id);
    } else {
      const subCommands = res.locals.subCommands.filter(command => ['profile', 'bio'].includes(command));
      if (!subCommands.length) {
        return badResponse(
          req.body.response_url,
          `Sorry :neutral_face:, you can't query the *_${res.locals.subCommands.join(' or ')}_* of a non-fellow.`,
        );
      }
      res.locals.subCommands = subCommands;
    }
  } catch (error) {
    return badResponse(req.body.response_url, ':cry: Something went wrong...', error);
  }
  res.locals.userData = userData;
  res.locals.userSkills = userSkills;
  return next();
};
