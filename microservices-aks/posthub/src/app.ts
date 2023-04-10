import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { healthcheckRouter } from './routes/healthcheck';
import { getAllCommentRouter } from './routes/all-comment';
import { getAllPostRouter } from './routes/all-post';
import { getPostRouter } from './routes/get-post';


import { checkUserState } from './middleware/loggedin-user';
import { errorHandler } from './middleware/error-handler/error-handler';import { PageNotFound } from './middleware/error-handler/404';


const app = express();

app.set('trust proxy', 1);

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


app.use(healthcheckRouter)

app.use(checkUserState);

app.use(getAllCommentRouter);
app.use(getAllPostRouter);
app.use(getPostRouter);

app.all('*', async (req, res, next) => {
    next (new PageNotFound());
});

app.use(errorHandler);

export { app };