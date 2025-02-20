import mongoose from "mongoose";

const education_schema=new mongoose.Schema({
  degree: { type: String, required: true },
  branch: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: Number, min:1900, max: new Date().getFullYear() }
});

const experience_schema=new mongoose.Schema({
  job_title: { type: String, required: true },
  company: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date }
});

const user_schema=new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }], 
  experience: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }], 
  skills: { type: [String], default: [] },
  summary: { type: String, trim: true }
}, { timestamps: true });

export const Education=mongoose.model('Education', education_schema);
export const Experience=mongoose.model('Experience', experience_schema);
export const Applicant=mongoose.model('Applicant', user_schema);


