const mongoose = require("mongoose");
const schema = mongoose.Schema;
const tripSchema = new schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },    
    source: {
        type: Object,
        required: true,
    },
    destination: {
        type: Object,
        required: true,
    },
    route: {
        type: Array
    },
    waypoints: {
        type: Array,
        default: []
    },
    dateTime: {
        type: Date,
        required: true,
    },
    max_riders: {
        type: Number,
        required: true,
    },
    available_riders: {
        type: Boolean,
        default: true
    },
    riders: {
        type: [{ type: schema.Types.ObjectId, ref: "user" }],
        default: []
    },
    completed: {    // false: active
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("trip", tripSchema)