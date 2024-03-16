import Ticket from "@/models/Ticket";
import User from "../../../models/User";
import connectDB from "../../../utils/mongoose";
import { NextResponse } from "next/server";

var CryptoJS = require("crypto-js");

export async function POST(req, res) {
    try {
        const body = await req.json();
        console.log(body)
        const { Name, Email, Phone, Place, StartTime, EndTime, RemainingTicket, StartDate, EndDate, Price } = body;
        await connectDB();
        const TicketName = await Ticket.findOne({ Name: Name })
        if (!TicketName) {
            await Ticket.create({ Name, Email, Phone, Place, StartTime, EndTime, RemainingTicket, StartDate, EndDate, Price });
            return NextResponse.json({ status: 300, message: "Ticket Added Successfully" });
        }
        else {
            return NextResponse.json({ status: 300, message: "Ticket Name Alredy Exist" });
        }


    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 300, message: error.message });
    }
}


