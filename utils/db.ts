import mongoose from "mongoose";
import { Sequelize } from "sequelize-typescript";
import { config } from 'dotenv';
config();

const dbUrl: string = process.env.DB_URI || '';

export const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            dbName: "lms",
        }).then((data: any) => {
            console.log(`Database connected with ${data.connection.host}`);

        })
    } catch (error: any) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
}

// export const sequelize = new Sequelize(
//     config.development.database, config.development.username, config.development.password, {
//     host: config.development.host,
//     dialect: 'mysql',

//     models: [__dirname + '/models'],
// });