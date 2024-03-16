const mongoose = require('mongoose')


const Ticket = new mongoose.Schema({
    Name: { type: String, reqired: true },
    Email: { type: String, require: true },
    Price: { type: Number, require: true },
    StartTime: { type: String, require: true },
    EndTime: { type: String, require: true },
    StartDate: { type: String, require: true },
    EndDate: { type: String, require: true },
    RemainingTicket: { type: Number, require: true },
    Place: { type: String, require: true }
}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Ticket", Ticket);