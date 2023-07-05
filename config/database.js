import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST
const DATABASE = process.env.DATABASE
const DB_PORT = process.env.DB_PORT
export const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}`)

const dbConnect = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default dbConnect