const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken") ; 
require("dotenv").config()
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 20,
        required: true,
    },

    username: {
        type: String,
        minlength: 6,
        maxlength: 20,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        minlength: 6,
        maxlength: 100,
        required: true,
    },

    email: {
        type: String,
        minlength: 6,
        maxlength: 50, // Increased max length for email
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], // Basic email regex validation
        unique: true,
    },
    todos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }]
}, {
    timestamps: true // Correctly placed timestamps option
});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next() ; 
})

userSchema.methods.createJWT = function(){
    return jwt.sign({
        userId: this._id,
        username: this.username,
        name: this.name,
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}
module.exports = mongoose.model("User", userSchema)