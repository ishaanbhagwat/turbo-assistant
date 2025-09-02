import express from 'express';
import { getUserById, createUser } from '../services/userService';

const router = express.Router();

router.post('/google/callback', async(req, res) => {
    const {email, name, picture, googleId } = req.body;

    try{
        let user = await getUserById(googleId);

        if (!user) {
            user = await createUser({email, name, picture, googleId});
        }

        res.json(user);
    }
    catch (err){
        let errorMessage = 'Unknown error';
        if (err instanceof Error){
            errorMessage = err.message;
        }
        res.status(400).json({error: errorMessage});
    }
});

export default router;