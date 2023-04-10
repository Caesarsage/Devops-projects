import express from 'express';

const router = express.Router();

router.get('/api/posts/healthcheck', (req, res) => {
    res.send('Hi, I am alive in posts microservice');
});

export { router as healthcheckRouter };