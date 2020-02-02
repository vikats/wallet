import { Request, Response } from 'express';

import app from '../app';

import { BAD_REQUEST_CODE } from '../constants/api';

async function verifyPlayerToken(req: Request, res: Response) {
  const { models } = app.get('dbConnection');
  const { oneTimeToken } = req.body;

  // add validation for token by createdAT
  const accessToken = await models.accessTokens.findByTokenValue(oneTimeToken);

  if (!accessToken) {
    return res.sendStatus(BAD_REQUEST_CODE);
  }

  await accessToken.destroy();

  return res.send({ playerId: accessToken.playerId });
}

export {
  verifyPlayerToken,
}
