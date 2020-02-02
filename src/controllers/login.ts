import { Request, Response } from 'express';

import app from '../app';
import { createHash } from '../utils/hash-string';
import { BAD_REQUEST_CODE, NOT_FOUND_CODE, USER_NOT_FOUND } from '../constants/api';

async function login(req: Request, res: Response) {
  const { models } = app.get('dbConnection');

  const { username, password } = req.body;
  if (!username || !password) {
    return res.sendStatus(BAD_REQUEST_CODE);
  }

  const hashedPassword = createHash(password);

  const player = await models.players.findByUsernameAndPassword(username, hashedPassword);

  const { id } = player || {};
  if (!id) {
    return res.status(NOT_FOUND_CODE).send({ message: USER_NOT_FOUND });
  }

  const oneTimeToken = createHash(JSON.stringify({ id, date: Date.now() }));

  await models.accessTokens.create({ oneTimeToken, playerId: id });

  return res.send({ oneTimeToken});
}

export {
  login,
}
