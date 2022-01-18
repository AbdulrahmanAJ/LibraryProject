var db = require('../models')
var author = db.Author
var book = db.Book
var genre = db.Genre
var reader = db.Reader


exports.getAdding = async (req, res) => {
    const authors = await author.findAll();
    const genres = await genre.findAll();
    const readers = await reader.findAll();    
    res.render("adding",  {
        authors, genres, readers
    })
    
}

exports.postAdding = async (req, res) => {
    await db[req.params.model].create( req.body );
    res.redirect('/modify/adding');
}


exports.getDeleting = async (req, res) => {
    const authors = await author.findAll();
    const genres = await genre.findAll();
    const readers = await reader.findAll();
    const books = await book.findAll();
    res.render("deleting",  {
        authors, genres, books, readers
    })
}

exports.postDeleting = async (req, res) => {
    await db[req.params.model].destroy( {where: req.body} );
    res.redirect('/modify/deleting');
}

exports.getAddingBook = async (req, res) => {
    const authors = await author.findAll();
    const genres = await genre.findAll();
    const readers = await reader.findAll();
    
    res.render("addBook",  {
        authors, genres, readers
    })
}

exports.postAddingBook = async (req, res) => {
    await book.create( req.body );
    res.redirect('/');
}