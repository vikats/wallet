import { Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status-codes';

import app from '../app';

export async function verifyPlayerToken(req: Request, res: Response) {
  const { models } = app.get('dbConnection');
  const { oneTimeToken } = req.body;

  const accessToken = await models.accessTokens.findByTokenValue(oneTimeToken);

  if (!accessToken) {
    return res.sendStatus(BAD_REQUEST);
  }

  await accessToken.destroy();

  return res.send({ playerId: accessToken.playerId });
}
