import express from 'express';
import bodyParser from 'body-parser';

import sequelize from './sequelize';
import models from './models';
import controllers from './controllers';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sequelize(app);
models(app);
controllers(app);

export default app;
