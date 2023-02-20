const mongoose = require("mongoose");
//import mongoose from "mongoose";
const crypto = require("crypto");
//import crypto from "crypto";
const { v1: uuidv1 } = require('uuid');
//import {v1 as uuidv1 } from "uuid";

const schema = mongoose.Schema;
const userSchema = new schema({
    name: {
        type: String,
        require: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    phone_number: {
        type: Number,
        trim: true,
    },
    cnic: {
        type: String,
        trim: true,
    },
    license: {
        type: String,
        trim: true,
    },
    encry_password: {
        type: String,
        require: true,

    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        default: 'Male'
    },
    salt: String, // will store the encryption of password field
    user_photo: {
        data: Buffer,
        ContentType: String
    },
    trips: {
        // type: Array,
        type: [{ type: schema.Types.ObjectId, ref: "trip" }],
        default: []
    },
    active_trip: {
        type: mongoose.ObjectId,
        //default:null
    },
    trip_role_driver: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
userSchema.virtual("password").set(function (password) {
    this._password = password,
        this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
/*.get(function(){
    return this._password;
});
*/
userSchema.methods = {
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },
    securePassword: function (plainpassword) {
        /*if(!plainpassword)
        return ""*/


        return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');


    }
}
module.exports = mongoose.model("user", userSchema)
//export default mongoose.model("user",userSchema)