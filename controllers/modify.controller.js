var db = require('../models')
var Author = db.Author
var Book = db.Book
var Genre = db.Genre
var Reader = db.Reader


exports.getAdding = async (req, res) => {
    const authors = await Author.findAll();
    const genres = await Genre.findAll();
    const readers = await Reader.findAll();    
    res.render("adding",  {
        authors, genres, readers
    })
    
}

exports.postAdd = async (req, res) => {
    await db[req.params.model].create( req.body );
    res.redirect('/modify/adding');
}


exports.getDeleting = async (req, res) => {
    const authors = await Author.findAll();
    const genres = await Genre.findAll();
    const readers = await Reader.findAll();
    const books = await Book.findAll();
    res.render("deleting",  {
        authors, genres, books, readers
    })
}

exports.postDelete = async (req, res) => {
    await db[req.params.model].destroy( {where: req.body} );
    res.redirect('/modify/deleting');
}

exports.getAddingBook = async (req, res) => {
    const authors = await Author.findAll();
    const genres = await Genre.findAll();
    const readers = await Reader.findAll();
    
    res.render("addingBook",  {
        authors, genres, readers
    })
}

exports.postAddBook = async (req, res) => {
    // find or create the ids'
    if (req.body.authorName){
        const [author] = await Author.findOrCreate({
            where: {authorName: req.body.authorName.trim()},
        });
        req.body.authorId = author.authorId
    }
    
    // check if the pages is empty
    if (!(req.body.bookPages)) delete req.body.bookPages;

    console.log(req.body)
    // create the book    
    await Book.create(req.body).catch(err => console.log(err))

    res.redirect('/');
}