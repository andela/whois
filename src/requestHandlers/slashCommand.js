import axios from 'axios';
import Andelan from '../lib/andelan';

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

export const sendBadResponse = (responseUrl, message = '') => (
  axios.post(responseUrl, JSON.stringify({ text: message }))
);

const addDeleteButton = (slackResponse) => {
  // eslint-disable-next-line no-param-reassign
  if (!slackResponse.attachments) slackResponse.attachments = [];
  slackResponse.attachments.push({
    fallback: 'Delete',
    callback_id: 'delete_button',
    color: 'danger',
    attachment_type: 'default',
    actions: [
      {
        name: 'Delete',
        text: 'Delete Message',
        type: 'button',
      },
    ],
  });
};

const validateSlashCommand = (req, res, next) => {
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
  const waitResponse = {
    response_type: 'ephemeral',
    text: `Gathering ${userHandle} data. This might take some seconds.`,
  };
  addDeleteButton(waitResponse);
  res.json(waitResponse).status(200).end();
  return next();
};

const extractSubCommands = (req, res, next) => {
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

const getUserMail = async (req, res, next) => {
  const { response_url: responseUrl } = req.body;
  await axios
    .get(`https://slack.com/api/users.info?token=${slackToken}&user=${res.locals.userId}`)
    .then((slackRes) => {
      if (!slackRes.data.ok) {
        return sendBadResponse(responseUrl, ':cry: Something went wrong.');
      }
      const { user: { profile: { email } } } = slackRes.data;
      res.locals.userEmail = email;
      return next();
    })
    .catch(() => sendBadResponse(responseUrl, ':cry: Something went wrong..'));
};

const getUserInfo = async (req, res, next) => {
  let userData;
  let userSkills;
  try {
    userData = await Andelan.getUserWithEmail(res.locals.userEmail);
    if (!userData) {
      return sendBadResponse(
        req.body.response_url,
        'Sorry :disappointed:, this user does not have a profile on AIS.',
      );
    }
    if (Andelan.isFellow(userData.roles) && res.locals.subCommands.includes('skills')) {
      userSkills = await Andelan.getSkillsWithId(userData.id);
    } else {
      const subCommands = res.locals.subCommands.filter(command => ['profile', 'bio'].includes(command));
      if (!subCommands.length) {
        return sendBadResponse(
          req.body.response_url,
          `Sorry :neutral_face:, you can't query the *_${res.locals.subCommands.join(' or ')}_* of a non-fellow.`,
        );
      }
      res.locals.subCommands = subCommands;
    }
  } catch (error) {
    return sendBadResponse(req.body.response_url, ':cry: Something went wrong...', error);
  }
  res.locals.userData = userData;
  res.locals.userSkills = userSkills;
  return next();
};

const sendUserDetailsToSlack = async (req, res) => {
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
  addDeleteButton(slackResponse);
  return axios.post(req.body.response_url, JSON.stringify(slackResponse));
};

export default [
  validateSlashCommand,
  extractSubCommands,
  getUserMail,
  getUserInfo,
  sendUserDetailsToSlack,
];
