const mongoose = require('mongoose')


const UserTicket = new mongoose.Schema({
    Name: { type: String, reqired: true },
    Email: { type: String, require: true },
    Price: { type: Number, require: true },
    TotalPrice: { type: Number, require: true },
    Members: { type: Number, require: true },
    StartTime: { type: String, require: true },
    EndTime: { type: String, require: true },
    Place: { type: String, require: true },
    TicketName: { type: String, require: true }
}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("UserTicket", UserTicket);
