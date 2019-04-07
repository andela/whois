import crypto from 'crypto';
import queryString from 'querystring';

// To understand the implementation here,
// you have to understand this https://api.slack.com/docs/verifying-requests-from-slack
export default (req, res, next) => {
  const slackSignature = req.headers['x-slack-signature'];
  const reqTimeStamp = req.headers['x-slack-request-timestamp'];

  const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET);
  hmac.update(`v0:${reqTimeStamp}:${queryString.stringify(req.body)}`);

  const mySignature = `v0=${hmac.digest('hex')}`;
  if (slackSignature === mySignature) {
    return next();
  }
  return res.status(200).send({
    response_type: 'ephemeral',
    text: 'Request not authed',
  });
};
