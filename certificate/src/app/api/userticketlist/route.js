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
        const { Email } = body;
        await connectDB();
        const ticketlist = await UserTicket.find({ Email: Email });
        return NextResponse.json({ status: 300, message: ticketlist });


    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 300, message: error.message });
    }
}


