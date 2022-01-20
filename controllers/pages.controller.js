var db = require('../models')
var Author = db.Author
var Book = db.Book
var Genre = db.Genre
var Reader = db.Reader



// create the routing
exports.getForMainPage = async (req, res) => {
    const authors = await Author.findAll();
    const genres = await Genre.findAll();
    const readers = await Reader.findAll();
    const books = await Book.findAll();

    res.render("all",  {
        authors,
        genres,
        readers,
        books
    })
}

exports.getForBooks = async (req, res) => {
    const books = await Book.findAll({include: { all: true }});
    const genres = await Genre.findAll();

    

    res.send({books, genres})
}

exports.getForAuthors = async (req, res) => {


    res.redirect('/')
}