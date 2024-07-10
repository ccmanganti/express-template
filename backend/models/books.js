// Books Model

// Import Mongoose
import mongoose from "mongoose";

// Schema for Books Class
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishYear: {
        type: Number,
        required: true,
    },
    },
    {
        timestamp: true
    }
);

//  Providing the Schema to the Books Model. This will also create
// collection on the mongodb automatically.
export const Book = mongoose.model('Book', bookSchema);

