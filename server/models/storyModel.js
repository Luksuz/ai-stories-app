const mongoose = require("mongoose")

const storySchema = mongoose.Schema({
    userInput:{
        type: String,
        required : [true, "Please add the user name"]
    },
    synopsis:{
        type: String,
        required : [true, "Please add the user name"]
    },
    title:{
        type: String,
        required : [true, "Please add the user name"]
    },
    part1:{
        type: String,
        required : [true, "Please add the user name"]
    },
    part2:{
        type: String,
        required : [true, "Please add the user name"]
    },    
    part3:{
        type: String,
        required : [true, "Please add the user name"]
    },    
    part4:{
        type: String,
        required : [true, "Please add the user name"]
    },    
    part5:{
        type: String,
        required : [true, "Please add the user name"]
    },
    randomEvents:{
        type: String,
        required : [true, "Please add the user name"]
    },
    imagePrompts:{
        type: String,
        required : [true, "Please add the user name"]
    },
    images:{
        type: String,
        required : [true, "Please add the user name"]
    }
},
{timestamps: true}
);

module.exports = mongoose.model("stories", storySchema)