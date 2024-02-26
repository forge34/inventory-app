const { default: mongoose } = require("mongoose");


const Schema = mongoose.Schema

const itemSchema = new Schema({
    name:{type:String , required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    stock:{type:Number,defualt:0},
    sold:{type:Number,default:0},
})

itemSchema.virtual('url').get(function(){
    return `/item/${this._id}`
})

module.exports = mongoose.model("items" , itemSchema)