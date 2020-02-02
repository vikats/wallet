import { Request, Response } from 'express';

import { decryptToken } from '../utils/hash-string';
import {
  FORBIDDEN_CODE,
  TRUSTED_ORIGINS
} from '../constants/api';

function isTrustOrigin(req: Request, res: Response, next: any) {
  const { microserviceHash } = req.headers;

  if (!microserviceHash) {
    return res.sendStatus(FORBIDDEN_CODE);
  }
  const originInfo = decryptToken(microserviceHash);
  const { microserviceName } = JSON.parse(originInfo);

  if (!TRUSTED_ORIGINS.includes(microserviceName)) {
    return res.sendStatus(FORBIDDEN_CODE);
  }

  return next();
}

export {
  isTrustOrigin,
}
