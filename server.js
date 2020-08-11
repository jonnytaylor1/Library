const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const db = require("./data");

let authorsRouter = require("./routes/authors");
let booksRouter = require("./routes/books");
let usersRouter = require("./routes/users");
let loansRouter = require("./routes/loans");
let searchRouter = require("./routes/search");

let app = express();

// interpret JSON body of requests
app.use(express.json());

// interpret url-encoded queries
app.use(express.urlencoded({ extended: false }));

// allow CORS
app.use(cors());

// allow CORS preflight for all routes
app.options("*", cors());

app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/loans", loansRouter);
app.use("/search", searchRouter);

// handle errors last
app.use(function(err, req, res, next) {
    res.status = err.status || 500;
    res.send(err);
});

// connect to the database and start the server running
db.initialiseDatabase(false, null);
app.listen(3000, function() {
    console.log("server listening");
});
