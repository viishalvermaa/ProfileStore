const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contactSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link1: {
    type: String,
    required: true
  },
  link2: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Contact', contactSchema)