const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')

///// GET TICKETS ///////////////////////////////////////////////////

// @desc   get notes for a ticket
// route   GET/api/tickets/:ticketId/notes
// access  Private
const getNotes = asyncHandler(async (req, res) => {
  // find user by id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

///// Create ticket note  ///////////////////////////////////////////////////

// @desc   create ticket note
// route   POST /api/tickets/:ticketId/notes
// access  Private
const addNote = asyncHandler(async (req, res) => {
  // find user by id in JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    ticket: req.params.ticketId,
    isStaff: false,
    user: req.user.id,
  })

  res.status(200).json(note)
})

module.exports = {
    getNotes,
    addNote
}
