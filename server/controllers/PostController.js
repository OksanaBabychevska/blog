import express, { response } from 'express';
import Post from '../models/Post.js';

export const create = async ( req, res ) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.title,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user:req.userId,
        });

        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can\'t create article'
        });
    }
};

export const getAll = async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch(err){ console.log(err);
        res.status(500).json({
            message: 'Can\'t get articles'
        });
    }
};

export const getOne = async (req, res) => {
    try{
        const postId = req.params.id;
        PostModel.findOneAndUpdate({
            
                _id:postId,
            
        },{
            $inc: { viewsCount: 1 }
        },
        {
            returnDocument : 'after',
        },
        (err,doc) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    message: 'Can\'t get article'
                });
            }

            if(!doc){
                return res.status(404).json({
                    message:'Article is absent'
                });
            }

            res.json(doc);
        },
        
        );

    } catch(err){ console.log(err);
        res.status(500).json({
            message: 'Can\'t get article'
        });
    }
};

export const remove = async (req, res) => {
    try{
        const postId = req.params.id;
        PostModel.findOneAndDelete({
                _id:postId,
        },(err,doc)=>{
           if(err) {console.log(err);
            return res.status(500).json({
                message: 'Can\'t delete article'
            });

        } 
        if(!doc) {
            return res.status(404).json({
                message:"Cant find article"
            });
        }

        response.json({
            success:true,
        });
        },
        
        );

    } catch(err){ console.log(err);
        res.status(500).json({
            message: 'Can\'t get article'
        });
    }
};

export const update = async (req,res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id:postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.useerId,
            tags: req.body.tags,

        },
        );
        res.json({
            success:true,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Can\'t update article'
        });
    }
}