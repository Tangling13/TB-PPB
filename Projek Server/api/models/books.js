const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  writer: { type: String, required: true },
  publisher: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  bookImage: {
    type: String,
  },
});

module.exports = mongoose.model("Book", bookSchema);
