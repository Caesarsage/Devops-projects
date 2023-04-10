import express from 'express';

const router = express.Router();

router.get('/api/comments/healthcheck', (req, res) => {
    res.send('Hi, I am alive in Comments microservice');
});

export { router as healthcheckRouter };