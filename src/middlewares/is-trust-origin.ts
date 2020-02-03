import { Request, Response } from 'express';
import { FORBIDDEN } from 'http-status-codes';

import { createHash } from '../utils/hash-string';
import {
  TRUSTED_ORIGIN
} from '../constants';

export function isTrustOrigin(req: Request, res: Response, next: any) {
  const microserviceHash = req.headers['microservice-hash'];
  const { body } = req;

  if (!microserviceHash) {
    return res.sendStatus(FORBIDDEN);
  }

  const hash = createHash({ microserviceName: TRUSTED_ORIGIN, body });
  if (microserviceHash !== hash) {
    return res.sendStatus(FORBIDDEN);
  }

  return next();
}
