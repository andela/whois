import express from 'express';
import requestHandlers from './requestHandlers';

const router = express.Router();
const {
  verifySlackReq, slashCommand, deleteMessage, ping,
} = requestHandlers;

router.post('/slash-command', verifySlackReq, slashCommand);

router.post('/delete-message', verifySlackReq, deleteMessage);

router.post('/ping', ping);

export default router;
