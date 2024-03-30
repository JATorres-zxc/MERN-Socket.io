import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';

import connectToMongoDb from './db/connectToMongoDb.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // Body parsing middleware should be placed here
app.use(cookieParser()) // cookie parser middleware

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// app.get('/', (req, res) => {
//     res.send('hello worldd');
// });

app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`);
});
