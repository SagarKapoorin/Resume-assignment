import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';
import { router_ai } from './enrich.js';
import { auth } from '../middleware/auth.js';
import { search } from './search.js';
dotenv.config();

export const router = express.Router();

router.post('/login', async(req,res) => {
  const { username, password }=req.body;
  if (username==='naval.ravikant' && password==='05111974') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.status(200).json({ JWT: token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.use("/resume",auth,router_ai);
router.use("/search",auth,search);