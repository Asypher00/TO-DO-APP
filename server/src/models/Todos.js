const mongoose = require("mongoose");
const { description, required } = require("../validationSchema/RegisterSchema");

const todoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },


    description: {
        type: String,
        required: true
    },

    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
}, {
    timestamps: true // Correctly placed timestamps option
})

module.exports = mongoose.model("Todo", todoSchema);