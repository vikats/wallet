import { Request, Response } from 'express';
import { BAD_REQUEST, NOT_FOUND, OK } from 'http-status-codes';

import app from '../app';

export async function withdrawBalance(req: Request, res: Response) {
  const { models } = app.get('dbConnection');

  const { betAmount, playerId } = req.body;
  if (!betAmount) {
    return res.sendStatus(BAD_REQUEST);
  }

  const wallet = await models.wallets.getByPlayerId(playerId);
  if (!wallet) {
    return res.sendStatus(NOT_FOUND);
  }
  const { balance } = wallet;

  if (balance < betAmount) {
    return res.sendStatus(BAD_REQUEST);
  }

  wallet.balance = balance - betAmount;

  await wallet.save();

  return res.sendStatus(OK);
}
