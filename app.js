let mysql = require("mysql")
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')

const sequelize = require('./models')



// set up the view enginees
// app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// set up the public path
app.use(express.static("public"))


// set up the database
let db = mysql.createConnection({
    // i think it well differentiate from user to other
    host: "localhost",
    user: "root",
    password: "",
    database:"library_project",
    multipleStatements: true
})
db.connect((err)=>{
  if (err) throw err
  console.log("DataBase Connected")
})

// set up the Middelwares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



// create the routing
app.use('/', require('./routes/pages.router'))
app.use('/modify', require('./routes/modify.router'))













app.get('/delete', (req, res) => {
    // res.redirect('/books')
    let sql = "SELECT * FROM authors; SELECT * FROM genres; SELECT * FROM readers; SELECT * FROM books;"
    db.query(sql, (err, results, fields) => {
        if (err) throw err
        res.render("delete",  {
            authors:results[0],
            genres:results[1],
            readers:results[2],
            books:results[3]
        })
    })
})

app.get('sequelize', (req, res) => {
    res.send(sequelize.Books.findAll())
})

app.get('/books', (req, res) => {
    let sql = "SELECT * FROM books " +
    "JOIN readers ON books.reader_id=readers.reader_id " +
    "JOIN authors ON books.author_id=authors.author_id " +
    "JOIN genres ON books.genre_id=genres.genre_id; " +
    "SELECT COUNT(books.genre_id), genres.genre_name, genres.genre_id "+
    "FROM books " +
    "JOIN genres ON books.genre_id=genres.genre_id " +
    "GROUP BY genres.genre_id; " +
    "SELECT COUNT(book_id) FROM books;"
    db.query(sql, (err, results, fields) => {
        if (err) throw err
        res.render("books",  {
            books: results[0],
            genres: results[1],
            books_count: results[2][0]["COUNT(book_id)"]
        })
    })
})

app.get('/authors', (req, res) => {
    let sql = "SELECT authors.author_name, authors.author_id, COUNT(books.book_id) FROM books "
    + "JOIN authors ON books.author_id=authors.author_id "
    + "GROUP BY books.author_id "
    + "ORDER BY COUNT(books.book_id) DESC;"
    + "SELECT * FROM books " +
    "JOIN readers ON books.reader_id=readers.reader_id " +
    "JOIN authors ON books.author_id=authors.author_id " +
    "JOIN genres ON books.genre_id=genres.genre_id; "
    db.query(sql, (err, results, fields) => {
        if (err) throw err
        console.log(results[0])
        res.render("authors",  {
            authors: results[0],
            books: results[1]
        })
    })
})

app.get('/addBook', (req, res) => {
    let sql = "SELECT * FROM authors; SELECT * FROM genres; SELECT * FROM readers"
    db.query(sql, (err, results, fields) => {
        if (err) throw err
        let authors = results[0]
        let genres = results[1]
        let readers = results[2]
        
        res.render("addBook",  {
            authors, genres, readers
        })
    })
})

app.post('/addBook', (req, res) => {
    let sql, values;
    if (req.body.book_pages) {
        values = [req.body.book_name, req.body.author_id, req.body.book_pages, req.body.genre_id,
            req.body.book_copy, req.body.reader_id, req.body.did_read]
        sql = "INSERT INTO books (book_name, author_id, book_pages, genre_id, book_copy, reader_id, did_read) VALUES (?, ?, ?, ?, ?, ?, ?);";
    } else {
        values = [req.body.book_name, req.body.author_id, req.body.genre_id,
            req.body.book_copy, req.body.reader_id, req.body.did_read]
        sql = "INSERT INTO books (book_name, author_id, genre_id, book_copy, reader_id, did_read) VALUES (?, ?, ?, ?, ?, ?);";
    }

    db.query(sql, values, (err, res) => {
        if (err) throw err
        console.log("book added sucssfully")
    })

    res.redirect("/books")
})

app.get('/addAuthorAndGenreAndReader', (req, res) => {
    let sql = "SELECT * FROM authors; SELECT * FROM genres; SELECT * FROM readers"
    db.query(sql, (err, results, fields) => {
        if (err) throw err
        let authors = results[0]
        let genres = results[1]
        let readers = results[2]
        
        res.render("addAuthorAndGenreAndReader",  {
            authors, genres, readers
        })
    })
})

app.post('/addAuthor', (req, res) => {
    let author_name = req.body.author_name
    let sql = "INSERT INTO authors (author_name) VALUES (?);";

    db.query(sql, author_name, (err, res) => {
        if (err) throw err
        console.log("author added sucssfully")
    })

    res.redirect("/addAuthorAndGenreAndReader")
})
app.post('/addGenre', (req, res) => {
    let genre_name = req.body.genre_name
    let sql = "INSERT INTO genres (genre_name) VALUES (?);";

    db.query(sql, genre_name, (err, res) => {
        if (err) throw err
        console.log("genre added sucssfully")
    })

    res.redirect("/addAuthorAndGenreAndReader")
})
app.post('/addReader', (req, res) => {
    let reader_name = req.body.reader_name
    let sql = "INSERT INTO readers (reader_name) VALUES (?);";

    db.query(sql, reader_name, (err, res) => {
        if (err) throw err
        console.log("reader added sucssfully")
    })

    res.redirect("/addAuthorAndGenreAndReader")
})

app.post('/deleteBook', (req, res) => {
    let book_id = req.body.book_id
    let sql = "DELETE FROM books WHERE book_id=?;";
    db.query(sql, book_id, (err, res) => {
        if (err) throw err
        console.log("book deleted sucssfully")
    })
    res.redirect("/delete")
})
app.post('/deleteAuthor', (req, res) => {
    let author_id = req.body.author_id
    let sql = "DELETE FROM authors WHERE author_id=?;";
    db.query(sql, author_id, (err, res) => {
        if (err) throw err
        console.log("author deleted sucssfully")
    })
    res.redirect("/delete")
})
app.post('/deleteGenre', (req, res) => {
    let genre_id = req.body.genre_id
    let sql = "DELETE FROM genres WHERE genre_id=?;";
    db.query(sql, genre_id, (err, res) => {
        if (err) throw err
        console.log("genre deleted sucssfully")
    })
    res.redirect("/delete")
})
app.post('/deleteReader', (req, res) => {
    let reader_id = req.body.reader_id
    let sql = "DELETE FROM readers WHERE reader_id=?;";
    db.query(sql, reader_id, (err, res) => {
        if (err) throw err
        console.log("reader deleted sucssfully")
    })
    res.redirect("/delete")
})


// create a 404 status and page
app.use((req, res) => {
    res.status(404).render('404')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


