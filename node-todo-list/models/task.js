const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  enter: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);