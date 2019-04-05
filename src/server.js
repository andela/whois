import 'newrelic';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotEnv from 'dotenv';
import keepDynoAwake from './lib/keepDynoAwake';
import routes from './routes';

dotEnv.config();

const server = express();
const port = process.env.PORT || 8008;

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(routes);

server.listen(port, () => {
  console.log(`App started on port ${port}`);
  keepDynoAwake();
});
