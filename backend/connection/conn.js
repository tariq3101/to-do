const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

const conn = async (req, res) => {
    try {
        await mongoose.connect(process.env.URI).then(() => {
            console.log("Connect");
        })
    } catch (error) {
        console.error('Connection failed', error);
        // or throw the error
        throw new Error('Connection failed');

    }
}

conn();