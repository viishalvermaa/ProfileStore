const Contact = require('../models/contactModel')
const mongoose = require('mongoose')

// get all contacts
const getContacts = async (req, res) => {
  const user_id = req.user._id

  const contacts = await Contact.find({user_id}).sort({createdAt: -1})

  res.status(200).json(contacts)
}

// get a single contact
const getContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such contact'})
  }

  const contact = await Contact.findById(id)

  if (!contact) {
    return res.status(404).json({error: 'No such contact'})
  }
  
  res.status(200).json(contact)
}


// create new contact
const createContact = async (req, res) => {
  const {title, link1, link2} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!link1) {
    emptyFields.push('link1')
  }
  if(!link2) {
    emptyFields.push('link2')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const contact = await Contact.create({title, link1, link2, user_id})
    res.status(200).json(contact)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a contact
const deleteContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such contact'})
  }

  const contact = await Contact.findOneAndDelete({_id: id})

  if (!contact) {
    return res.status(400).json({error: 'No such contact'})
  }

  res.status(200).json(contact)
}

// update a contact
const updateContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such contact'})
  }

  const contact = await Contact.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!contact) {
    return res.status(400).json({error: 'No such contact'})
  }

  res.status(200).json(contact)
}


module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact
}