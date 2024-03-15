import User from "../../../models/User";
import connectDB from "../../../utils/mongoose";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
import { cookies } from 'next/headers'

export async function POST(req, res) {
    try {

        const body = await req.json();

        await connectDB();
        const user = await User.findOne({ email: body.email });
        const ticketSold = await User.findOne({ email: body.email });

    }
    catch (error) {

    }
}
