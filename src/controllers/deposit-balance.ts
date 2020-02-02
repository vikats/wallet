import {Request, Response} from 'express';

import app from '../app';

import {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  STATUS_OK_CODE,
} from '../constants/api';

async function depositBalance(req: Request, res: Response) {
  const { models } = app.get('dbConnection');

  const { betAmount, playerId } = req.body;
  if (!betAmount) {
    return res.sendStatus(BAD_REQUEST_CODE);
  }

  const wallet = await models.wallets.getByPlayerId(playerId);
  if (!wallet) {
    return res.sendStatus(NOT_FOUND_CODE);
  }
  const { balance } = wallet;

  wallet.balance = balance + betAmount;

  await wallet.save();

  return res.sendStatus(STATUS_OK_CODE);
}

export {
  depositBalance,
}
