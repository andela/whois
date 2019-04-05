import express from 'express';
import requestHandlers from './requestHandlers';

const router = express.Router();

router.post('/slash-command', requestHandlers.slashCommand);

router.post('/delete-message', requestHandlers.deleteMessage);

router.post('/ping', requestHandlers.ping);

export default router;
