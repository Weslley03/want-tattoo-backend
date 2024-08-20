import { connect } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
if(!DB_USER && !DB_PASSWORD ) throw new Error('SECRET_KEY is not defined in the environment variables');

export function connetcDatabase(){
  console.log('conectando banco...');
  connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.btani6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` 
  )
  .then(() => console.log("mongoDB Atlas OK !"))
  .catch((err) => console.error(`unable to connect to the database ${err}`));
}

export default connetcDatabase;