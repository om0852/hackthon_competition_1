import User from "../../../models/User";
import connectDB from "../../../utils/mongoose";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");

export async function POST(req, res) {
    try {
        const body = await req.json();
        console.log(body)
        const { Name, Email, Phone, Place, StartTime, EndTime, RemainingTicket } = body;
        await connectDB();
        await User.create({ Name, Email, Phone, Place, StartTime, EndTime, RemainingTicket });
        return NextResponse.json({ status: 300, message: "Ticket Added Successfully" });


    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 300, message: error.message });
    }
}
