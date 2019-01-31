/*
  As of 31/01/2018, this server is still hosted on an Heroku free dyno.
  Heroku free dynos are set to sleep after 30mins of inactivity, what this means is that
  if this server is not active for about 30min, the server would be killed until there is
  a request. Such behaviour is definately not good for this app.

  The code in this file is just a quick hack around how to enusure that the server never
  gets inactive for 30min.
*/

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { APP_BASE_URL } = process.env;
const pingInterval = 25 * 60 * 1000;

if (!APP_BASE_URL) {
  throw Error('APP_BASE_URL needs to be configured as part of environment variables.');
}

export default () => {
  console.log(`KeepServerAwake is configured to ping server every ${pingInterval}ms`);
  setInterval(() => {
    axios.post(`${APP_BASE_URL}/ping`)
      .then(() => {
        console.log(`Successfully pinged server. ${new Date()}`);
      })
      .catch((error) => {
        console.log(`Error pinging server. ${new Date()}`);
        console.log(`Error log: ${error.message}`);
      });
  }, pingInterval);
};
