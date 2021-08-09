const dotenv = require('dotenv');
dotenv.config();

export const config = {
    dbUrl: process.env.MONGO_URI
}
