const express = require('express');
const Book = require('./Book.js');

const app = express();
const port = 3000;

const bookRouter = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', bookRouter);

let books = [
    new Book(1, "Dune", "sf", "Frank Herbert"),
    new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
    new Book(3, "Foundation", "sf", "Asimov")
];



bookRouter.route('/books')
    .get((req, res) => {
        let filteredBooks;

        // filtrare după gen
        if (req.query.genre) {
            filteredBooks = books.filter(x => x.genre === req.query.genre);
        } else {
            filteredBooks = books;
        }

        // sortare alfabetică după nume
        filteredBooks = filteredBooks.sort((a, b) => a.name.localeCompare(b.name));

        res.json(filteredBooks);
    })

    .post((req, res) => {
        const { id, name, genre, author } = req.body;

        // VALIDARE
        if (!id || !name || !genre || !author) {
            return res.status(400).json({
                message: "Missing required fields: id, name, genre, author"
            });
        }

        // creare carte nouă
        const newBook = new Book(id, name, genre, author);

        // adăugare în listă
        books.push(newBook);

        res.status(201).json({
            message: "Book added successfully",
            book: newBook
        });
    });



app.get('/', (req, res) => {
    res.send('Welcome to my API');
});



app.listen(port, () => {
    console.log('Running on the port ' + port);
});
