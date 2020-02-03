import { Request, Response } from 'express';
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';

import app from '../app';

import { createHash } from '../utils/hash-string';
import { ERRORS } from '../constants';
const { USER_NOT_FOUND } = ERRORS;

export async function login(req: Request, res: Response) {
  const { models } = app.get('dbConnection');

  const { username, password } = req.body;
  if (!username || !password) {
    return res.sendStatus(BAD_REQUEST);
  }

  const hashedPassword = createHash(password);

  const player = await models.players.findByUsernameAndPassword(username, hashedPassword);

  const { id } = player || {};
  if (!id) {
    return res.status(NOT_FOUND).send({ message: USER_NOT_FOUND });
  }

  const oneTimeToken = createHash({ id, date: Date.now() });

  await models.accessTokens.create({ oneTimeToken, playerId: id });

  return res.send({ oneTimeToken});
}
