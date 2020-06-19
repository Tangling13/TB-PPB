const mongoose = require("mongoose");
const Book = require("../models/books");

exports.getAll = (req, res, next) => {
  Book.find()
    .select("_id title writer publisher year bookImage description")
    .exec()
    .then((docs) => {
      const count = {
        totalBooks: docs.length,
      };
      res.status(200).json({
        count,
        books: docs,
        message: "Get all book success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.postBook = (req, res, next) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    writer: req.body.writer,
    publisher: req.body.publisher,
    year: req.body.year,
    description: req.body.description,
    bookImage: req.file.path,
  });

  book
    .save()
    .then((result) => {
      res.status(200).json({
        createdBook: result,
        message: "Add book success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getBookById = (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          book: doc,
          message: "Get book success",
        });
      } else {
        res.status(404).json({
          message: "Not found book, wrong ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateBook = (req, res, next) => {
  const id = req.params.bookId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Book.update(
    { _id: id },
    {
      $set: { updateOps },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Book updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteBook = (req, res, next) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        book: result,
        message: "Book deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
