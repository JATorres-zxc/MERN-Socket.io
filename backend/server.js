import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';


import connectToMongoDb from './db/connectToMongoDb.js';
import { app,server } from './socket/socket.js';

import path from 'path'


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve() // for deployment

dotenv.config();

app.use(express.json()); // Body parsing middleware should be placed here
app.use(cookieParser()) // cookie parser middleware

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// app.get('/', (req, res) => {
//     res.send('hello worldd');
// });

app.use(express.static(path.join(__dirname, '/frontend/dist'))) // for deployment

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
}) // for deployment

server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`);
});
