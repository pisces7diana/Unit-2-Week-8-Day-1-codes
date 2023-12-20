/**
 * Dependencies
 */
// give our server access to the .env file
require("dotenv").config()

const express = require("express")
const morgan = require("morgan")

const app = express()
const PORT = process.env.PORT || 3013;

// bring in our model
const Tweet = require("./models/Tweet.js")


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

app.use(morgan("dev")) // Logger
app.use(express.urlencoded({ extended: true })) // body parser

/**
 * Routes
 */

// INDUCES

// Index - GET
app.get("/tweets", async (req, res) => {
    // Find all fo the tweets in our collection
    let allTweets = await Tweet.find({}) // find all of the object that match our Tweet model

    res.send(allTweets)
})


// Update - PUT
app.put("/tweets/:id", async (req, res) => {
    const id = req.params.id
    const newTweet = req.body
    // Find by _id and then update
    let updatedTweet = await Tweet.findByIdAndUpdate(
        id, // the id of what we're looking for
        newTweet, // the data to update with
        {new: true} // we want to see the new data, not the old
        )
    res.send(updatedTweet)
})

// Create - POST
app.post("/tweets", async (req, res) => {
    // Use the Tweet model to create a new tweet
    let newTweet = await Tweet.create(req.body)
    res.send(newTweet)
})

// Show Route
app.get("/tweets/:id", async (req, rest) => {
    // Get a tweet by the _id
    let foundTweet = await Tweet.findByID(req.params.id)
    res.send(foundTweet)
})

/**
 * Server Listener
 */
app.listen(PORT, () => console.log(`Hey I can hear you on port: ${PORT}`))