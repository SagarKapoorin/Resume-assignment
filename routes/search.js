import express from 'express';
import { decrypt } from '../helper/crypto.js';
import { encrypt } from '../helper/crypto.js';
import { User } from '../models/index.js';

export const search=express.Router();
search.post('/', async(req, res)=>{ //work both for hashed or simple name
  try {
    const encryptedName=req.body.name;
    // console.log(encryptedName)
    let name=decrypt(encryptedName);
    if(name===null){
      name=encryptedName;
    };
    console.log(name);
    const regex=new RegExp(name,'i'); // partial match
    const applicants=await User.find({ name: regex });
    const results=applicants.map(app => ({
      ...app._doc,
      name: encryptedName,
      email: encrypt(app.email)
    }));
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ error: 'No applicants found' });
  }
});