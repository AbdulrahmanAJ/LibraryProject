var db = require('../models')
var author = db.Author
var book = db.Book
var genre = db.Genre
var reader = db.Reader



// create the routing
exports.getForMainPage = async (req, res) => {
    const authors = await author.findAll();
    const genres = await genre.findAll();
    const readers = await reader.findAll();
    const books = await book.findAll();

    res.render("all",  {
        authors,
        genres,
        readers,
        books
    })
}