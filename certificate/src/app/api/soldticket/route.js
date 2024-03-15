import Ticket from "@/models/Ticket";
import User from "../../../models/User";
import connectDB from "../../../utils/mongoose";
import { NextResponse } from "next/server";
import UserTicket from "@/models/UserTicket";
var CryptoJS = require("crypto-js");

export async function POST(req, res) {
    try {
        const body = await req.json();
        console.log(body)
        const { id, Name, Email, Phone, Members } = body;
        await connectDB();
        const checkticket = await Ticket.findOne({ _id: id });
        console.log(checkticket)
        if (parseInt(checkticket.RemainingTicket) > 0) {
            await UserTicket.create({ Name, Email, Phone, Members, TotalPrice: (parseInt(checkticket.Price) * parseInt(Members)), Place: checkticket.Place, StartTime: checkticket.StartTime, EndTime: checkticket.EndTime, Price: checkticket.Price, TicketName: checkticket.Name })
            const ucheckticket = await Ticket.updateOne({ _id: id }, { RemainingTicket: parseInt(checkticket.RemainingTicket) - Members });
            return NextResponse.json({ status: 300, message: "Ticket Purchase Successfully" });


        }
        else {
            return NextResponse.json({ status: 300, message: "No Ticket Remaining" });

        }


    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 300, message: error.message });
    }
}


