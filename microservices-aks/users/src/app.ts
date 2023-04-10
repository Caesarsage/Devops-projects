import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler } from './middleware/error-handler/error-handler';import { PageNotFound } from './middleware/error-handler/404';

import { healthcheckRouter } from './routes/healthcheck';
import { activeUserRouter } from './routes/active-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(
    cookieSession({
        name: 'session',
        keys: ['ChangeThis2AUniqUEKe&', 'ThisIsAnotherKey'],
        maxAge: 1 * 60 * 60 * 1000, // 1 hour
        secure: false, // set to true if using ssl certificate in production
        httpOnly: true,
        signed: false
    })
);

app.use(healthcheckRouter);
app.use(activeUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.all('*', async (req, res, next) => {
    next(new PageNotFound());
});

app.use(errorHandler);

export { app };