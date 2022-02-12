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
    await db[req.params.model].destroy( {where: req.body}).catch(err => console.log(err))
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
exports.postAddAndEditBook = async (req, res) => {
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
    
    var newBook;
    if (req.body.bookId) {
        const bookId = req.body.bookId;
        delete req.body.bookId;
        newBook = await Book.update(req.body, {
            where: {
                userId: user.userId,
                bookId
            }
          }).catch(() => {
            req.flash('error_msg','Something Went Wrong!');
            res.redirect('/books');
          });
          if (newBook){
            req.flash('success_msg','Book Has Been Edited!');
            res.redirect(`/books/`);
            // res.redirect(`/books/#book${ bookId }Covers0`);
        }

    }

    newBook = await Book.create(req.body).catch((err) => {
        req.flash('error_msg','Something Went Wrong!');
        res.redirect('/modify/addingBook');
    });

    if (newBook){
        req.flash('success_msg','Book Has Been Added!');
        res.redirect('/modify/addingBook');
    } else {
        req.flash('error_msg','Something Went Wrong!');
        res.redirect('/modify/addingBook');
    }
}

exports.postDeleteBook = async (req, res) => {
    // get the user from the request
    const userId = req.user.userId;
    const bookId = req.body.bookId;

    // try to delete the book if done redirect and send success message
    // Delete everyone named "Jane"
    await Book.destroy({
        where: {
            userId, bookId
        }
    })
    // .then(() => {
    // })
    .catch(() => {
        req.flash('error_msg','Failed to delete the book');
        res.redirect('/books');
    });

    req.flash('success_msg','Book Has Been Deleted!');
    res.redirect(`/books`);
  
}


// exports.postEditBook = async (req, res) => {
//     // get the user from the request
//     const user = req.user;

//     // make sure if there is an author name
//     if (req.body.authorName) {
//         const [author] = await Author.findOrCreate({  // create an author if the author name is not founded
//             where: {authorName: req.body.authorName.trim(), userId:user.userId},
//         });
//         req.body.authorId = author.authorId // insert the author Id to the request
//     } else {
//         delete req.body.authorName;
//     }

//     // it checks if the user added a new genre
//     if (req.body.genreId == '-1') { 
//         const [genre] = await Genre.findOrCreate({  // create a genre if not founded
//             where: {genreName: req.body.genreName.trim(), userId:user.userId},
//         });
//         req.body.genreId = genre.genreId // insert the genre Id to the request
//     }

//     // make sure if there is a book pages
//     if (!(req.body.bookPages)) delete req.body.bookPages;


//     console.log(req.body);
//     res.send(req.body)
// }

