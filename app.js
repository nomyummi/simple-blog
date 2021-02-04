import http from 'http';
import createError from 'http-errors';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './components/posts/post-API.js';
import userRoutes from './components/users/user-API.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

// Connect to database
var mongoDB = `mongodb+srv://nomyummi:${process.env.DB_PASS}@cluster0.tyrah.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = process.env.PORT || '9000';
const app = express();

// Backend
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Setup routes
app.use('/api',postRoutes);
app.use('/api',userRoutes);
// Add react front end
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'client','build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client','build', 'index.html'));
});

// Catch 404 and forward to error handler // TODO: Figure out proper error handling
app.use(function(req, res, next) {
  next(createError(404,'This page cannot be found!'));
});

const server = http.createServer(app);
server.listen(port,()=>{
  console.log(`Server listening on port ${port}`);
});