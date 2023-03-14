const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please Select a product'],
      enum: ['iPhone', 'MacBook Pro', 'iPad', 'iMac'],
    },
    description: {
      type: String,
      required: [true, 'Please describe the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'close'],
      default: 'new',
    },
  },
  {
    timestamp: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)
