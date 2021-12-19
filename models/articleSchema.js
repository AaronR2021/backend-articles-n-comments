var mongoose=require('mongoose')
var Schema=mongoose.Schema

var articleSchema=new Schema({
    title:String,
    description:String,
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }]
},{timestamps:true})

module.exports=mongoose.model("Article",articleSchema)