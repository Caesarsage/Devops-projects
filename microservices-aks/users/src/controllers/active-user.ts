import { Request, Response } from 'express';

export const activeUserController = async (req: Request, res: Response) => {
    res.json({ loggedInUser: req.loggedInUser || null });
}