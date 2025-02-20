import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
const algorithm='aes-256-cbc';
const key=Buffer.from(process.env.ENCRYPTION_KEY, 'hex');//256 bit or 64 byte
const iv=crypto.randomBytes(16);//16 bytes of 64 bits
// console.log(key.toString('hex'))
// console.log(iv)
export const encrypt=(text)=>{
  const cipher=crypto.createCipheriv(algorithm,key,iv);
  let encrypted=cipher.update(text,'utf8','hex');//hexa partial-conversion
//   console.log(encrypted)
  encrypted+=cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export const decrypt=(encryptedText)=> {
  try{
  const [ivHex,data]=encryptedText.split(':');
  if (!ivHex || !data){ return null};
  const decipher=crypto.createDecipheriv(algorithm,key,Buffer.from(ivHex, 'hex'));
    let decrypted=decipher.update(data,'hex','utf8');
    //   console.log(decrypted)
  decrypted+=decipher.final('utf8');
  return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error.message);
    return null; 
  }
}

