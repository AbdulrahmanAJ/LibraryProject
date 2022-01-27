var db = require('../models')
var Author = db.Author
var Book = db.Book
var Genre = db.Genre
var Sequelize = require('sequelize')



// create the routing
exports.getForMainPage = async (req, res) => {
    const user = req.user;
    const authors = await Author.findAll({where: {userId: user.userId}}).catch(err => console.log(err));
    const genres = await Genre.findAll({where: {userId: user.userId}}).catch(err => console.log(err));
    const books = await Book.findAll({where: {userId: user.userId}}).catch(err => console.log(err));

    // var user = {userId:'1323'}
    res.render("all",  {
        authors, genres, books, user
    })
}

exports.getForBooks = async (req, res) => {
    const user = req.user;


    const books = await Book.findAndCountAll({
        where: {userId: user.userId},
        include: {all: true}
    }).catch(err => console.log(err));
    console.log(books);
    // res.send(books)

    const genres = await Genre.findAll({
        where : {userId: user.userId},
         include: {
            all:true,
            nested:true,
        }
    }).catch(err => console.log(err));

    const genresCount = await Genre.findAll({
        where: {userId: user.userId},
        attributes: { 
            include: [[Sequelize.fn("COUNT", Sequelize.col("books.bookId")), "booksCount"]],
        },
        include: {
            model: Book, attributes: [], all: true, where: {userId: user.userId}
        },
        group: ['Genre.genreId']
    }).catch(err => console.log(err));

    // insert the booksCount to the genres
    for (let i = 0; i < genres.length; i++) {
        if (genresCount[i]){
            genres[i].booksCount = genresCount[i].dataValues.booksCount
        }
        if (! genres[i].booksCount) delete genres[i];
    }
    
    res.render('books copy',{
        genres, books, user
    })
    // res.send({
    //     genres, books
    // })
    
}

exports.getForAuthors = async (req, res) => {
    const user = req.user;

    const authors = await Author.findAll({
        where: {userId: user.userId},
         include: {
            all:true,
            nested:true,
        }
    }).catch(err => console.log(err));

    const authorsCount = await Author.findAll({
        where: {userId: user.userId},
        attributes: { 
            include: [ [Sequelize.fn("COUNT", Sequelize.col("books.bookId")), "booksCount"]],
        },
        include: {
            model: Book, attributes: [], all: true, where: {userId: user.userId}
        },
        group: ['Author.authorId']
    }).catch(err => console.log(err));

    // insert the booksCount to the authors
    for (let i = 0; i < authors.length; i++) {    
        authors[i].booksCount = authorsCount[i].dataValues.booksCount
        authors[i].dataValues.booksCount = authorsCount[i].dataValues.booksCount
    }
    
    // sort the authors by the highest booksCount
    authors.sort((a, b) => (a.booksCount < b.booksCount) ? 1 : -1)

    // res.send({
    //     authors
    // })
    res.render('authors', {
        authors, user
    })
}
