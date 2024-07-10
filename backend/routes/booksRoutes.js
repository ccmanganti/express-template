import express from 'express';
import { Book } from '../models/books.js'
const router = express.Router();

// GET ROUTES
//  Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).send({
            count: books.length,
            data: books
        });
    } catch (e) {
        console.log(e.message);
        return res.status(500).send({message: e.message});
    }
});
// Get one book by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).send(book);
    } catch (e) {
        console.log(e.message);
        return res.status(500).send({message: e.message});
    }
});

// PUT ROUTES
// Update book by id
router.put('/:id', async (req, res) => {
    try {
        
        if (!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: "Incomplete Field"
            });
        }

        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if (!book){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).json({message: 'Book updated successfully'});
    } catch (e) {
        console.log(e.message);
        return res.status(500).send({message: e.message});
    }
});

// DELETE ROUTES
// Delete book by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).json({message: 'Book deleted successfully'});
    } catch (e) {
        console.log(e.message);
    }
});



// POST ROUTES

router.post('/', async (req, res) => {
    try {
        // Checks if all fields are filled.
        if (!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: "Incomplete Field"
            });
        }
        // Creates instance of Book class from books.js
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        });

        // Save the newBook to database Books collection.
        const savedBook = await newBook.save();
        return res.status(201).send(savedBook);
    } catch (e) {
        console.log(e.message);
        return res.status(500).send({message: e.message});
    }
});


export default router;
