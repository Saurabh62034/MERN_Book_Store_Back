import express from "express";
import {Book } from "../models/bookModels.js";

const router = express.Router();

router.post('/',async(req, res)=>{
    try{
        console.log("jai bheem");
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(200).send({message: 'Send all required fields: title, author, publishYear'})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch(err){}
})
//Routes for find books
router.get("/", async(req,res)=>{
    try{
        console.log("hello world");
        const books = await Book.find({});
        return res.status(200).json(books);
    }catch(err){console.log(err.message);}
})
//Routes for finding a book with id

router.get("/:id", async(req,res)=>{
    
    try{
        
        const {id} = req.params;
        console.log("id in react router = "+id);
        const book = await Book.findById(id);
        console.log("id in react router = "+book);
        return res.status(200).json(book);
    }catch(err){console.log(err.message);}
})

//Routes for update a book
router.put('/:id', async(req,res)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({message: 'send all required fields: title, author, publishYear'})
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(400).json({message: 'Book not found'});

        }
        return res.status(200).send({message: 'Book updated successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).send('message: err.message');
    }
})
//Route for deleting a book
router.delete('/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).send({message: 'Book deleted successfully'});
    }
    catch(err){

    }
})
export default router;