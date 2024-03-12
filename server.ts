import { connectDB} from './utils/db';
import { app } from './app';
import { sequelize } from './db/models';
// import { config } from 'dotenv';
// config();

// set timezone
process.env.TZ = 'Africa/Nairobi';


//create server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);

    // mongodb connection
    connectDB();

    // Test sql database connection
    sequelize
        .authenticate()
        .then(() => {
            console.log('Database connection has been established successfully.');
            sequelize.sync({alter: true})
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
})