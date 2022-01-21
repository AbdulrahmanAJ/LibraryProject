let mysql = require("mysql")
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')



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


// create a 404 status and page
app.use((req, res) => {
    res.status(404).render('404')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


