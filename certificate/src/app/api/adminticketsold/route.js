import Ticket from "@/models/Ticket";
import connectDB from "../../../utils/mongoose";
import { NextResponse } from "next/server";
import UserTicket from "@/models/UserTicket";
var CryptoJS = require("crypto-js");

export async function POST(req, res) {
    try {
        const body = await req.json();
        console.log(body)
        const { Name } = body;
        await connectDB();
        const ticketlist = await UserTicket.find({ TicketName: Name });
        return NextResponse.json({ status: 300, message: ticketlist });


    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 300, message: error.message });
    }
}




