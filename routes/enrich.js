import {readPdfText} from 'pdf-text-reader';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { User } from '../models/index.js';
import { encrypt } from '../helper/crypto.js';
import { Router } from 'express';
dotenv.config();

export const router_ai=Router();

const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router_ai.post('/enrich',async(req,res)=>{
  try {
    const { url } = req.body;
        const text = await readPdfText({url: url}); //pdf to text
        // console.log(text);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); //ai init
        //prompt
        const prompt = `Extract resume data into JSON format with the following fields: 
        { 
          "name": "Full Name",
          "email": "Email Address",
          "education": [
            {
              "degree": "Degree",
              "branch": "Field of Study",
              "institution": "Institution Name",
              "year": "Year of Completion"
            }
          ],
          "experience": [
            {
              "job_title": "Job Title",
              "company": "Company Name",
              "start_date": "Start Date",
              "end_date": "End Date"
            }
          ],
          "skills": ["Skill1", "Skill2", "Skill3"],
          "summary": "Brief Summary"
        }
        Extract this JSON from the following resume text without backticks : \n\n${text}`;
        // console.log(prompt)
    const result=await model.generateContent(prompt);
    // console.log(result.response.text())
    const cleanedJsonString = result.response.text().replace(/```/g, '').replace(/\bJSON\b/g, '').trim();
    // console.log(cleanedJsonString)
    const data=JSON.parse(cleanedJsonString);
    // console.log(data)
    const applicant=new User({ ...data });
    await applicant.save(); //saving in database
    const encryptedData = {
      ...data,
      name: encrypt(data.name),
      email: encrypt(data.email)
    };
    // console.log(encryptedData);
    res.status(200).json(encryptedData);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to process PDF' });
  }
});