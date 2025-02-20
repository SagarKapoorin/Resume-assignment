import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const auth=(req,res,next)=>{
  const token=req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  jwt.verify(token,process.env.JWT_SECRET,(err,decoded) =>{
    if (err) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
    req.user=decoded;
    next();
  });
};
