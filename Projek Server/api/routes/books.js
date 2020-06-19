const express = require("express");
const router = express.Router();
const multer = require("multer");
const bookController = require("../controllers/books");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File type doesn't supported"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/books", bookController.getAll);

router.get("/books/:bookId", bookController.getBookById);

router.post("/books", upload.single("bookImage"), bookController.postBook);

router.patch("/books/:bookId", bookController.updateBook);

router.delete("/books/:bookId", bookController.deleteBook);

module.exports = router;
