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
    const user = req.user;
    const books = await Book.findAll({attributes:['bookName'], group: 'bookName', where:{userId:user.userId} }).catch(err => console.log(err));
    const authors = await Author.findAll({where: {userId: user.userId}}).catch(err => console.log(err));
    const genres = await Genre.findAll({where: {userId: user.userId}}).catch(err => console.log(err));;
    
    res.render("addingBook",  {
        authors, genres, books, user
    })
}
exports.postAddBook = async (req, res) => {
    // get the user from the request
    const user = req.user;

    // make sure if there is an author name
    if (req.body.authorName) {
        const [author] = await Author.findOrCreate({  // create an author if the author name is not founded
            where: {authorName: req.body.authorName.trim(), userId:user.userId},
        });
        req.body.authorId = author.authorId // insert the author Id to the request
    } else {
        delete req.body.authorName;
    }

    // it checks if the user added a new genre
    if (req.body.genreId == '-1') { 
        const [genre] = await Genre.findOrCreate({  // create a genre if not founded
            where: {genreName: req.body.genreName.trim(), userId:user.userId},
        });
        req.body.genreId = genre.genreId // insert the genre Id to the request
    }

    // make sure if there is a book pages
    if (!(req.body.bookPages)) delete req.body.bookPages;

    // check for the book copy
    var currentCopy = await Book.max('bookCopy', { where: {bookName:req.body.bookName, userId: user.userId} }).catch(err => console.log(err));
    if (currentCopy) req.body.bookCopy = currentCopy + 1;
    
    // make trim to the book name
    req.body.bookName = req.body.bookName.trim();

    // insert the user Id to req.body
    req.body.userId = user.userId

    // create the book    
    console.log(req.body)
    await Book.create(req.body).catch(err => console.log(err));

    req.flash('success_msg','Book Has Been Added!');
    res.redirect('/modify/addingBook');
}