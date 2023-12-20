/**
 * Dependencies
 */

const mongoose = require("mongoose")

/**
 * Short hand instead of writing 
 * mongoose.Schema
 * mongoose.model
 */
const { Schema, model } = mongoose; 

/**
 * Create a new schema
 * Schema -> This is the model/form of our data
 */

const tweetSchema = new Schema(
    {
        title: String,
        body: String,
        author: String,
        likes: {
            type: Number,
            default: 0
        },
        sponsored: {
            type: Boolean,
            default: false
        } 
    },
    {timestamps: true}
)

/**
 * Create the model
 * With our newly created schema
 */
const Tweet = model("Tweet", tweetSchema)

module.exports = Tweet

