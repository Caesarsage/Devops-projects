import express from 'express';

const router = express.Router();

router.get('/api/posthub/healthcheck', (req, res) => {
    res.send('Hi, I am alive in PostHub microservice');
});

export { router as healthcheckRouter };