var db = require('../models')
var Author = db.Author
var Book = db.Book
var Genre = db.Genre
const User = db.User
var Sequelize = require('sequelize')



// create the routing
exports.getForMainPage = async (req, res) => {
    const authors = await Author.findAll().catch(err => console.log(err));
    const genres = await Genre.findAll().catch(err => console.log(err));
    const genresTrial = await Genre.findAndCountAll().catch(err => console.log(err));
    const books = await Book.findAll().catch(err => console.log(err));
    const user = req.user;

    // var user = {userId:'1323'}
    res.render("all",  {
        authors, genres, books, genresTrial, user
    })
}

exports.getForBooks = async (req, res) => {
    const books = await Book.findAndCountAll({ include: { all: true, nested: true }
    }).catch(err => console.log(err));

    const genres = await Genre.findAll({
         include: {
            all:true,
            nested:true,
        }
    }).catch(err => console.log(err));

    const genresCount = await Genre.findAll({
        attributes: { 
            include: [ [Sequelize.fn("COUNT", Sequelize.col("books.bookId")), "booksCount"]],
        },
        include: {
            model: Book, attributes: [], all: true
        },
        group: ['Genre.genreId']
    }).catch(err => console.log(err));

    // insert the booksCount to the genres
    for (let i = 0; i < genres.length; i++) {    
        genres[i].booksCount = genresCount[i].dataValues.booksCount
    }
    
    res.render('books',{
        genres, books, user:req.user
    })
    // res.send({
    //     genres, books
    // })
    
}

exports.getForAuthors = async (req, res) => {

    const authors = await Author.findAll({
         include: {
            all:true,
            nested:true,
        }
    }).catch(err => console.log(err));

    const authorsCount = await Author.findAll({
        attributes: { 
            include: [ [Sequelize.fn("COUNT", Sequelize.col("books.bookId")), "booksCount"]],
        },
        include: {
            model: Book, attributes: [], all: true
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
        authors, user:req.user
    })
}
