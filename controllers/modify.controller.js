var db = require('../models')
var Author = db.Author
var Book = db.Book
var Genre = db.Genre


exports.getAdding = async (req, res) => {
    const authors = await Author.findAll();
    const genres = await Genre.findAll();

    res.render("adding",  {
        authors, genres
    })
    
}
exports.postAdd = async (req, res) => {
    await db[req.params.model].create( req.body );
    res.redirect('/modify/adding');
}


exports.getDeleting = async (req, res) => {
    const authors = await Author.findAll();
    const genres = await Genre.findAll();
    const books = await Book.findAll();

    res.render("deleting",  {
        authors, genres, books
    })
}
exports.postDelete = async (req, res) => {
    await db[req.params.model].destroy( {where: req.body})
    res.redirect('/modify/deleting');
}

exports.getAddingBook = async (req, res) => {
    const books = await Book.findAll({attributes:['bookName'] , group: 'bookName' }).catch(err => console.log(err));
    const authors = await Author.findAll();
    const genres = await Genre.findAll();
    
    res.render("addingBook",  {
        authors, genres, books, user:req.user
    })
}
exports.postAddBook = async (req, res) => {
    
    // make trim to the book name
    req.body.bookName = req.body.bookName.trim();
    
    if (req.body.authorName) { // make sure if there is an author name
        const [author] = await Author.findOrCreate({  // create an author if the author name is not founded
            where: {authorName: req.body.authorName.trim()},
        });
        req.body.authorId = author.authorId // insert the author Id to the request
    }
    
    if (req.body.genreId == '-1') { // it checks if the user added a new genre
        const [genre] = await Genre.findOrCreate({  // create a user name if not founded
            where: {genreName: req.body.genreName.trim()},
        });
        req.body.genreId = genre.genreId // insert the genre Id to the request
    }
    
    if (!(req.body.bookPages)) delete req.body.bookPages; // make sure if there is a book pages

    // check for the book copy
    var currentCopy = await Book.max('bookCopy', { where: {bookName:req.body.bookName} }).catch(err => console.log(err)); // 10
    if (currentCopy) req.body.bookCopy = currentCopy + 1;

    console.log(req.body)
    // create the book    
    await Book.create(req.body).catch(err => console.log(err))

    res.redirect('/');
}