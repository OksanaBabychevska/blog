import express from 'express';
import mongoose from 'mongoose';
import { registerValidator } from './validations/auth.js';
import { postCreateValidtion } from './validations/post.js';

import  checkAuth  from './utils/checkAuth.js';
import { register, login, getMe } from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose.connect(
    'mongodb+srv://admin:Babi_vi40@cluster0.w8r15o5.mongodb.net/blog?retryWrites=true&w=majority')
    .then(()=>console.log('DB ok'))
    .catch((err)=>console.log('DB error', err));
     

const app = express();

app.use(express.json());

app.get('/auth', checkAuth, getMe);
app.post('/login', login);
app.post('/register', registerValidator, register);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidtion, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(4444, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Server OK')
});