const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

const usersRouter = require('./routes/usersRouter');
const postsRouter = require('./routes/postsRouter');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);


async function startServer(){
    await connectDB();
    app.listen(process.env.PORT, ()=> {
        console.log('Listening to PORT', process.env.PORT);
    })
}
startServer();