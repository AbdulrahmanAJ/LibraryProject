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


// create a 404 status and page
app.use((req, res) => {
    res.status(404).render('404')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


