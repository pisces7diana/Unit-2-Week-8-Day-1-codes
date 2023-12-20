/**
 * Dependencies
 */
// give our server access to the .env file
require("dotenv").config()

const express = require("express")
const morgan = require("morgan")

const app = express()
const PORT = process.env.PORT || 3013;


/**
 * Database Configuration
 */
const mongoose = require("mongoose")
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL)

db.on("error", (err) => console.log(err.message + `something went wrong with mongo`))
db.on("connected", () => console.log("mongo connected"))
db.on("closed", () => console.log("mongo disconnected"))

/**
 * Middleware
 */

app.use(morgan("dev"))

/**
 * Routes
 */

/**
 * Server Listener
 */
app.listen(PORT, () => console.log(`Hey I can hear you on port: ${PORT}`))