import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import * as dotenv from 'dotenv';

import { registerValidator } from './validations/auth.js';
import { postCreateValidtion } from './validations/post.js';

import  checkAuth  from './utils/checkAuth.js';
import { register, login, getMe } from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

import handleValidationErrors from './utils/handleValidationErrors.js';

require('dotenv').config();

mongoose.connect(
    process.env.MOONGODB)
    .then(()=>console.log('DB ok'))
    .catch((err)=>console.log('DB error', err));
     

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/auth', checkAuth, getMe);
app.post('/login', handleValidationErrors, login);
app.post('/register', handleValidationErrors, registerValidator, register);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidtion, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidtion, handleValidationErrors, PostController.update);

app.post('/upload', upload.single('image'), (req, res) => {
    req.json({
        url:`/uploads/${res.file.originalname}`,
    })
});

app.listen(4444, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Server OK')
});