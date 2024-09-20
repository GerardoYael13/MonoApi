import mongoose from "mongoose";


const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    isSent: {
       type: Boolean,
        default: false
    },
     genre: {
        type: String,
        required: true,
        enum: ["male", "female", "other"], 
    },
    age: {
        type: Number,
        required: true,
        min: 0 
    },
    creationDate: {
        type: Date,
        default: Date.now() 
    } 
});


export const MonoModel = mongoose.model("Incident", incidentSchema);
