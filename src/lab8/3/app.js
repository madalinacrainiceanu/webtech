const express = require('express');
const Book = require('./Book.js');

const app = express();
const port = 3000;

const bookRouter = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', bookRouter);

// Lista de cărți
let books = [
    new Book(1, "Dune", "sf", "Frank Herbert"),
    new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
    new Book(3, "Foundation", "sf", "Asimov")
];


// GET /api/books + filtrare + sortare
bookRouter.route('/books')
    .get((req, res) => {
        let filteredBooks = books;

        if (req.query.genre) {
            filteredBooks = books.filter(b => b.genre === req.query.genre);
        }

        filteredBooks = filteredBooks.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        res.json(filteredBooks);
    })


    // POST /api/books — validare
    .post((req, res) => {
        const { id, name, genre, author } = req.body;

        if (!id || !name || !genre || !author) {
            return res.status(400).json({
                message: "Missing required fields: id, name, genre, author"
            });
        }

        const newBook = new Book(id, name, genre, author);
        books.push(newBook);

        res.status(201).json({
            message: "Book added successfully",
            book: newBook
        });
    });


// DELETE /api/books/:id
bookRouter.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        deleted: deletedBook[0]
    });
});


// Răspuns simplu pentru /
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(port, () => {
    console.log('Running on the port ' + port);
});
