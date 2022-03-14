// Iteration #1

const { model, Schema } = require("mongoose");

const droneSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    propellers: Number,
    maxSpeed: Number
})

const droneModel = model('drone', droneSchema)

module.exports = droneModel;