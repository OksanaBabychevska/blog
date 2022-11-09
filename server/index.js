import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
mongoose.connect(
    'mongodb+srv://admin:Babi_vi40@cluster0.w8r15o5.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>console.log('DB ok'))
    .catch((err)=>console.log('DB erroe', err));
     

const app = express();

app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Hello World!');
});

app.post('/login',(req,res)=>{
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,  
    },
    'secret123'
    );

res.json({
    success:true,
    token
});
});

app.listen(4444, (err)=>{
    if(err){
        return console.log(err)
    }
    console.log('Server OK')
});