var db = require('../models')
var Author = db.Author
var Book = db.Book
var Genre = db.Genre
var Loaner = db.Loaner
var Sequelize = require('sequelize')



// create the routing
exports.getForMainPage = async (req, res) => {
    res.redirect('/books')


    // const user = req.user;
    // const authors = await Author.findAll({where: {userId: user.userId}}).catch(err => console.log(err));
    // const genres = await Genre.findAll({where: {userId: user.userId}}).catch(err => console.log(err));
    // const books = await Book.findAll({where: {userId: user.userId}}).catch(err => console.log(err));

    // // var user = {userId:'1323'}
    // res.render("all",  {
    //     authors, genres, books, user
    // })
}

exports.getForBooks = async (req, res) => {
    const user = req.user;


    const books = await Book.findAll({
        where: {userId: user.userId},
        include: {all: true}
    }).catch(err => console.log(err));
    // res.send(books)

    const genres = await Genre.findAll({
        where : {userId: user.userId},
         include: [{
            model:Book,
            include: [Author, Genre, Loaner]
        }]
    }).catch(err => console.log(err));

    const authors = await Author.findAll({
        where : {userId: user.userId}
    }).catch(err => console.log(err));

    const loaners = await Loaner.findAll({
        where : {userId: user.userId}
    }).catch(err => console.log(err));
    
    res.render('books',{
        genres, books, user, authors, loaners
    })
    // res.send({
    //     genres, books
    // })
    
}

exports.getForAuthors = async (req, res) => {
    const user = req.user;

    const authors = await Author.findAll({
        where : {userId: user.userId},
        include: [{
            model:Book,
            include: [Author, Genre, Loaner]
        }]
    }).catch(err => console.log(err));

    const books = await Book.findAll({
        where: {userId: user.userId},
        include: {all: true}
    }).catch(err => console.log(err));
    // res.send(books)

    const genres = await Genre.findAll({
        where : {userId: user.userId},
         include: [{
            model:Book,
            include: [Author, Genre, Loaner]
        }]
    }).catch(err => console.log(err));

    const loaners = await Loaner.findAll({
        where : {userId: user.userId}
    }).catch(err => console.log(err));

    // sort the authors by the highest booksCount
    try {
        authors.sort((a, b) => {
            return b.Books.length - a.Books.length;
        });
    } catch (error) {
        res.redirect('/')
    }

    // res.send({
    //     authors
    // })
    res.render('authors', {
        authors, user, books, loaners, genres
    })
}
