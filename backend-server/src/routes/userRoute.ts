import express from 'express';
import { getUserById, createUser } from '../services/userService';

const router = express.Router();

router.get('/:id', async(req, res) => {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

router.post('/', async(req, res) => {
    const user = await createUser(req.body);
    res.status(201).json(user);
});

export default router;